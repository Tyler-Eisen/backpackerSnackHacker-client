import { clientCredentials } from '../client';

const getCities = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/cities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.warn('Error fetching cities:', error);
      reject(error);
    });
});

const getSingleCity = (cityId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/cities/${cityId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.warn(`Error fetching city with ID ${cityId}:`, error);
      reject(error);
    });
});

export {
  getCities, getSingleCity,
};
