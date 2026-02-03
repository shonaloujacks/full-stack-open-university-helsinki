import patients from '../../data/patientEntries'
import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getPatients = (): PatientEntry[] => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation
  }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient
};