import { clientCredentials } from '../client';

const getSingleShop = (shopId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shops/${shopId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.warn({ data });
      resolve(data);
    })
    .catch((error) => {
      console.warn('Error fetching shop by ID:', error);
      reject(error);
    });
});
const getCityShops = (cityId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/shops?city_id=${cityId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
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

const favoriteShop = (shopId, uid) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/shops/${shopId}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify({
      uid,
    }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const unfavoriteShop = (shopId, uid) => fetch(`http://localhost:8000/shops/${shopId}/unfavorite`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${uid}`,
  },
  body: JSON.stringify({ uid }),
});

export {
  getCityShops,
  favoriteShop,
  unfavoriteShop,
  getSingleShop,
};
