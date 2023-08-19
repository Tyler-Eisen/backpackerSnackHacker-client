import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: '',
    countryOfOrigin: '',
    uid: user.uid,
    imageUrl: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.uid));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          required
          placeholder="Enter your Name"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
        <Form.Text className="text-muted">Tell us your name</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="userCountry">
        <Form.Label>Country of Origin</Form.Label>
        <Form.Control
          type="text"
          name="countryOfOrigin"
          required
          placeholder="Enter your Country"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userImage">
        <Form.Label>Profile Image URL</Form.Label>
        <Form.Control
          type="url"
          name="imageUrl"
          required
          placeholder="Enter Image URL"
          onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
