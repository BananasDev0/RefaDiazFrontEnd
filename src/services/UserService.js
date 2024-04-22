import axios from './axiosConfig';
import User from '../models/User';


export const createUser = async(userData) => {
  const result = await axios.post('/user', userData);

  return result.response ? new User(result.response) : [];
}

export const getUser = async(id) => {
  const result = await axios.get(`/user/${id}`);

  return result.response ? new User(result.response) : [];
}
