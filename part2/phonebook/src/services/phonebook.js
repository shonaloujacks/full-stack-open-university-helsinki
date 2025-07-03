import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (personObject) => {
  const response = await axios.post(baseURL, personObject);
  return response.data;
};

export default { baseURL, getAll, create };
