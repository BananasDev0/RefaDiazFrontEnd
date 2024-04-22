import axios from './axiosConfig';
import Provider from '../models/Provider';

const createProvider = async (providerData) => {
  const result = await axios.post('/provider', providerData);
  return result.response ? new Provider(result.response) : [];
}

const getProvider = async (id) => {
  const result = await axios.get(`/provider/${id}`);
  return result.response ? new Provider(result.response): []
}

const getAll = async(page, limit) => {
  const result = await axios.get(`/providers`, {
    params: {
      page:page,
      limit:limit
    }
  })

  const { providers ,totalCount } = result.response;
  const mappedProviders = providers.map(provider => new Provider({ ...provider }));

  return result.response && Array.isArray(result.response.providers) ? { providers: mappedProviders, totalCount } : [];
}
  
const deleteProvider = async(id) => {
  const result = await axios.delete(`/provider/${id}`);
  
  return result.statusCode === 204 ? true : false;
}

const updateProvider = async(id, updatedData) => {
  const result = await axios.put(`/provider/${id}`, updatedData);

  return result.statusCode === 204 ? true : false;
}



export { createProvider, getProvider, getAll, deleteProvider, updateProvider };