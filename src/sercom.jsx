import axios from 'axios';



const baseUrl = import.meta.env.VITE_BASE_URL || '/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data);
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`);
}

const update = (id, updatedObject) => {
  return axios.put(`${baseUrl}/${id}`, updatedObject).then(response => response.data);
}

export default { getAll, create, remove, update };
