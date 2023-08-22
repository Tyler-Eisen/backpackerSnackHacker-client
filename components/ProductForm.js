import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import getCityShops from '../utils/data/shopData';
import { createProduct } from '../utils/data/productData';

const initialState = {
  name: '',
  price: '',
  image_url: '',
  shop: '',
};

const ProductForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getCityShops()
      .then(setShops)
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...currentProduct,
      userId: user.id,
    };

    createProduct(payload)
      .then(() => router.push(`/shop/${currentProduct.shop}`))
      .catch((error) => {
        console.error('Failed to create product:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          placeholder="Enter product name"
          required
          value={currentProduct.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          placeholder="Enter product price"
          required
          value={currentProduct.price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          name="image_url"
          placeholder="Enter product image URL"
          required
          value={currentProduct.image_url}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Shop</Form.Label>
        <Form.Select
          name="shop"
          required
          value={currentProduct.shop}
          onChange={handleChange}
        >
          <option value="">Select a Shop</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit">Create Product</Button>
    </Form>
  );
};

export default ProductForm;
