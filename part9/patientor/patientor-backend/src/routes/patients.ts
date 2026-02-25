import express, {Request, Response, NextFunction} from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils';
import { z } from "zod";
import { NewPatientEntry, NonSensitivePatientEntry, DiagnosisEntry, SickLeave, Discharge, PatientEntry, EntryWithoutId, Entry, HealthCheckRating } from '../types';


const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res: Response<PatientEntry>, next: NextFunction) => {
  try {
    res.send(patientService.getPatientById(req.params.id)) 
  } catch (error: unknown){
    next(error);
  }
})

const newPatientParser = (req: Request, _res: Response, next: NextFunction) =>  {
  try {
    req.body = NewPatientSchema.parse(req.body);
    next()
  } catch (error: unknown){
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({error: error.issues});
  } else {
    next(error);
  }
}

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry); 

});

const parseDiagnosisCodes = (object: unknown): Array<DiagnosisEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnosisEntry['code']>;
  }
  return object.diagnosisCodes as Array<DiagnosisEntry['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
  throw new Error('discharge object missing or not a string')
}
return {
  date: parseString(object.date), criteria: parseString(object.criteria)
  }
}

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object || typeof object !== 'object' || !('sickLeave' in object)) {
    return undefined;
  }
  const sickLeave = object.sickLeave;

  if (!sickLeave || typeof sickLeave !== 'object' || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    return undefined;
  }

  return { 
      startDate: parseString(sickLeave.startDate),
      endDate: parseString(sickLeave.endDate)
    }
};

const parseString = (value: unknown): string => {
  if (!value || typeof value !== 'string') { 
    throw new Error('value is missing or not a string');
  }
  return value;
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (!value || typeof value !== 'number' || !Object.values(HealthCheckRating).includes(value as number)) {
    throw new Error('healthCheckRating is missing or not a number');
  }
  return value;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const newEntryParser = (entry: EntryWithoutId) => { 
  switch(entry.type) {
    case "HealthCheck":
      return {
        description: parseString(entry.description),
        date: parseString(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry),
        type: 'HealthCheck'as const,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      }
    case "Hospital":
      return {
         description: parseString(entry.description),
        date: parseString(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry),
        type: 'Hospital' as const,
        discharge: parseDischarge(entry.discharge)
      }
    case "OccupationalHealthcare":
      return {
         description: parseString(entry.description),
        date: parseString(entry.date),
        specialist: parseString(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry),
        type: 'OccupationalHealthcare' as const,
        employerName: parseString(entry.employerName),
        sickLeave: parseSickLeave(entry)
      }
    default: 
      return assertNever(entry)
  }
}


router.post('/:id/entries', (req: Request<{id: string}, unknown, EntryWithoutId>, res: Response<Entry>) => {
  const parsedEntry = newEntryParser(req.body)
  console.log('THIS IS req.params.id', req.params.id, 'THIS IS parsedEntry', parsedEntry)
  const addedEntry = patientService.addEntry(parsedEntry, req.params.id)
  return res.json(addedEntry)
})

router.use(errorMiddleware)

export default router;
