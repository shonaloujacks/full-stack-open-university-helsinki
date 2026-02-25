"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const types_1 = require("../types");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientEntries());
});
router.get('/:id', (req, res, next) => {
    try {
        res.send(patientService_1.default.getPatientById(req.params.id));
    }
    catch (error) {
        next(error);
    }
});
const newPatientParser = (req, _res, next) => {
    try {
        req.body = utils_1.NewPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.post('/', newPatientParser, (req, res) => {
    const addedEntry = patientService_1.default.addPatient(req.body);
    res.json(addedEntry);
});
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [];
    }
    return object.diagnosisCodes;
};
const parseDischarge = (object) => {
    if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
        throw new Error('discharge object missing or not a string');
    }
    return {
        date: parseString(object.date), criteria: parseString(object.criteria)
    };
};
const parseSickLeave = (object) => {
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
    };
};
const parseString = (value) => {
    if (!value || typeof value !== 'string') {
        throw new Error('value is missing or not a string');
    }
    return value;
};
const parseHealthCheckRating = (value) => {
    if (!value || typeof value !== 'number' || !Object.values(types_1.HealthCheckRating).includes(value)) {
        throw new Error('healthCheckRating is missing or not a number');
    }
    return value;
};
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const newEntryParser = (entry) => {
    switch (entry.type) {
        case "HealthCheck":
            return {
                description: parseString(entry.description),
                date: parseString(entry.date),
                specialist: parseString(entry.specialist),
                diagnosisCodes: parseDiagnosisCodes(entry),
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
            };
        case "Hospital":
            return {
                description: parseString(entry.description),
                date: parseString(entry.date),
                specialist: parseString(entry.specialist),
                diagnosisCodes: parseDiagnosisCodes(entry),
                type: 'Hospital',
                discharge: parseDischarge(entry.discharge)
            };
        case "OccupationalHealthcare":
            return {
                description: parseString(entry.description),
                date: parseString(entry.date),
                specialist: parseString(entry.specialist),
                diagnosisCodes: parseDiagnosisCodes(entry),
                type: 'OccupationalHealthcare',
                employerName: parseString(entry.employerName),
                sickLeave: parseSickLeave(entry)
            };
        default:
            return assertNever(entry);
    }
};
router.post('/:id/entries', (req, res) => {
    const parsedEntry = newEntryParser(req.body);
    const addedEntry = patientService_1.default.addEntry(parsedEntry, req.params.id);
    return res.json(addedEntry);
});
router.use(errorMiddleware);
exports.default = router;
