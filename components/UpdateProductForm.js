import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createProduct, updateProduct } from '../utils/data/productData';

const initialState = {
  name: '',
  price: '',
  image_url: '',
  shop: '',
};

function UpdateProductForm({ product }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (product.id) {
      setFormInput(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formInput,
      userId: user.id,
    };
    if (product.id) {
      updateProduct(product.id, payload)
        .then(() => router.push(`/shop/${product.shop}`));
    } else {
      createProduct(payload)
        .then(() => router.push(`/shop/${product.shop}`))
        .catch((error) => {
          console.error('Failed to create product:', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          placeholder="Enter product name"
          required
          value={formInput.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          placeholder="Enter product price"
          required
          value={formInput.price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          name="image_url"
          placeholder="Enter product image URL"
          required
          value={formInput.image_url}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">{product.id ? 'Update' : 'Create'} Product</Button>
    </Form>
  );
}

UpdateProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    image_url: PropTypes.string,
    shop: PropTypes.string,
    // Add other product properties here if they exist
  }),
};

UpdateProductForm.defaultProps = {
  product: {},
};

export default UpdateProductForm;
