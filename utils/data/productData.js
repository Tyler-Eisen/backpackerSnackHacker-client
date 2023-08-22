import { clientCredentials } from '../client';

const getProductsByShop = (shopId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products?shop_id=${shopId}`, {
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
      console.error('Error fetching products for shop:', error);
      reject(error);
    });
});

const createProduct = (productObj) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productObj),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => {
      console.error('Error creating product:', error);
      reject(error);
    });
});

export {
  getProductsByShop,
  createProduct,
};
