import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  headers: {
    'x-api-key': process.env.REACT_APP_DOG_API_KEY,
  },
});

export const getRandomDogImage = async () => {
  const res = await api.get('/images/search?limit=1&has_breeds=1');
  return res.data[0];
};

export const getAllBreeds = async () => {
  const res = await api.get('/breeds');
  return res.data;
};
