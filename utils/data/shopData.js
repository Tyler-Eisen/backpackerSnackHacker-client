import { clientCredentials } from '../client';

const getCityShops = (cityId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shops?city_id=${cityId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.warn({ data });
      resolve(data);
    })
    .catch((error) => {
      console.warn('Error fetching shops for city:', error);
      reject(error);
    });
});

export default getCityShops;
