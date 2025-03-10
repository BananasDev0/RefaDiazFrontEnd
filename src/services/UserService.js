import axios from './axiosConfig';
import User from '../models/User';


export const createUser = async(userData) => {
  const result = await axios.post('/users', userData);

  return result.response ? new User(result.response) : [];
}

export const getUser = async(id) => {
  const result = await axios.get(`/users?id=${id}`);

  return result.response ? new User(result.response) : [];
}
