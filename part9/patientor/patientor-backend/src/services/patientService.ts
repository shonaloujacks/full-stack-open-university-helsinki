import patients from '../../data/patientEntries'
import {PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import {v1 as uuid} from 'uuid'

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
  }));
};

const getPatientById = (id: string): PatientEntry => {
  const patientDetails = patients.find((patient) => id === patient.id
  )
  if (!patientDetails) {
    throw new Error('Patient not found') 
  }
  else return patientDetails;
  
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid()
  const newPatient = {
    ...entry,
    id
  };
  patients.push(newPatient);
  console.log('These are patients: ', patients)
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientEntries,
  addPatient,
  getPatientById
};