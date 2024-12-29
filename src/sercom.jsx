import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


//const baseUrl = import.meta.env.VITE_BASE_URL || '/api/persons';
const baseUrl = process.env.VITE_BASE_URL || '/api/persons';
const api = '/api/persons'

const getAll = () => {
  console.log(api)
  return axios.get(api).then(response => response.data);
}

const create = newObject => {
  return axios.post(api, newObject).then(response => response.data);
}

const remove = id => {
    return axios.delete(`${api}/${id}`);
}

const update = (id, updatedObject) => {
  return axios.put(`${api}/${id}`, updatedObject).then(response => response.data);
}

export default { getAll, create, remove, update };
