import axios from "axios";
import { Patient, PatientFormValues, Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  )
  console.log('THIS IS DATA FROM CREATE API CALL', data);

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)

  return data;

}

const createEntry = async (id: string, object: EntryWithoutId ) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object)
  return data;
}

export default {
  getAll, 
  create, 
  getPatient, 
  createEntry
};

