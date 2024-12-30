import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


//const baseUrl = import.meta.env.VITE_BASE_URL || '/api/persons';
const baseUrl = process.env.VITE_BASE_URL || '/api/persons';
const api = '/api/persons';

const getAll = () => {
  console.log(baseUrl, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaatziiiiiiiiiiiiaaaaaaaaaaaaaaiaiaiaaaaaaaaaaaaa")
  return axios.get(baseUrl).then(response => response.data);
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data);
}

const remove = id => {
    console.log("deletion doneee")
    return axios.delete(`${baseUrl}/${id}`);
}

const update = (id, updatedObject) => {
  return axios.put(`${baseUrl}/${id}`, updatedObject).then(response => response.data);
}

export default { getAll, create, remove, update };
