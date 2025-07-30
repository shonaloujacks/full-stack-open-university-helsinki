import axios from "axios";
const baseURL = "/api/persons";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (personObject) => {
  const response = await axios.post(baseURL, personObject);
  return response.data;
};

const deleteEntry = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`);
  return response.data;
};

const update = async (id, newData) => {
  const response = await axios.put(`${baseURL}/${id}`, newData);
  return response.data;
};

export default { baseURL, getAll, create, deleteEntry, update };
