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

const getProductById = (productId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${productId}`, {
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
      console.error('Error fetching product by ID:', error);
      reject(error);
    });
});

const updateProduct = (productId, updatedProductObj) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProductObj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to update product');
    })
    .then(resolve)
    .catch((error) => {
      console.error('Error updating product:', error);
      reject(error);
    });
});

const deleteProduct = (productId) => fetch(`${clientCredentials.databaseURL}/products/${productId}`, {
  method: 'DELETE',
})
  .then((response) => {
    if (response.ok) {
      console.warn('Product deleted successfully');
    } else {
      throw new Error('Failed to delete product');
    }
  })
  .catch((error) => {
    console.error('Error deleting product:', error);
    throw error;
  });
export {
  getProductsByShop,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
