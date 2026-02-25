"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientEntries_1 = __importDefault(require("../../data/patientEntries"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patientEntries_1.default;
};
const getNonSensitivePatientEntries = () => {
    return patientEntries_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatientById = (id) => {
    const patientDetails = patientEntries_1.default.find((patient) => id === patient.id);
    if (!patientDetails) {
        throw new Error('Patient not found');
    }
    else
        return patientDetails;
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign(Object.assign({}, entry), { id });
    patientEntries_1.default.push(newPatient);
    console.log('These are patients: ', patientEntries_1.default);
    return newPatient;
};
const addEntry = (entry, patientId) => {
    const id = (0, uuid_1.v1)();
    const newEntry = Object.assign(Object.assign({}, entry), { id });
    const patient = patientEntries_1.default.find((patient) => { patient.id === patientId; });
    if (!patient) {
        throw new Error('patient does not exist');
    }
    ;
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    getNonSensitivePatientEntries,
    addPatient,
    getPatientById,
    addEntry
};
