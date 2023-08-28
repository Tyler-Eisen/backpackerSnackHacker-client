import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { updateComment } from '../utils/data/commentData';

const initialState = {
  productId: '',
  userId: '',
  content: '',
};

function UpdateCommentForm({ comment }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (comment.id) {
      setFormInput({
        ...initialState,
        productId: comment.productId, // Populate productId
        userId: user.id,
        content: comment.content,
      });
    }
  }, [comment, user]);

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
    console.warn('Payload:', payload);
    if (comment.id) {
      updateComment(comment.id, payload)
        .then(() => router.back());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          name="content"
          placeholder="Type your comment here"
          required
          value={formInput.content}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Comment</Button>
    </Form>
  );
}

UpdateCommentForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  comment: PropTypes.object.isRequired, // Add this prop validation
};

export default UpdateCommentForm;
