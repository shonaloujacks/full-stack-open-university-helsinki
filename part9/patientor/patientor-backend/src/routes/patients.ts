import express, {Request, Response, NextFunction} from 'express';
import patientService from '../services/patientService';
import { NewPatientSchema } from '../utils';
import { z } from "zod";
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';


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

router.use(errorMiddleware)

export default router;
