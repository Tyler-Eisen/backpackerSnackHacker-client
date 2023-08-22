import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createProduct } from '../utils/data/productData';

const initialState = {
  name: '',
  price: '',
  image_url: '',
  shop: '',
};

const ProductForm = () => {
  const router = useRouter();
  const { shopId } = router.query;
  const { user } = useAuth();
  const [currentProduct, setCurrentProduct] = useState({
    ...initialState,
    shop: shopId || '',
  });

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
    console.warn('Payload:', payload);
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

      <Button type="submit">Create Product</Button>
    </Form>
  );
};

export default ProductForm;
