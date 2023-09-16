import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createComment } from '../utils/data/commentData';

const initialState = {
  productId: '',
  userId: '',
  content: '',
};

const CommentForm = ({ onUpdate }) => {
  const router = useRouter();
  const productId = router.query.id;
  const { user } = useAuth();
  const [currentComment, setCurrentComment] = useState({
    ...initialState,
    productId: productId || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...currentComment,
      userId: user.id,
      productId,
    };
    createComment(payload)
      .then(() => {
        onUpdate();
        setCurrentComment(initialState);
      })
      .catch((error) => {
        console.error('Failed to create comment:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          name="content"
          placeholder="Type your comment here"
          required
          value={currentComment.content}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Comment</Button>
    </Form>
  );
};

CommentForm.propTypes = {
  onUpdate: PropTypes.func.isRequired, // Validate the onUpdate prop
};

export default CommentForm;
