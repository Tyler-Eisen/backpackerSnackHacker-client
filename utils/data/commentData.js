import { clientCredentials } from '../client';

const getCommentsByProduct = (productId) => fetch(`${clientCredentials.databaseURL}/comments?productId=${productId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching comments for product:', error);
    throw error;
  });

const createComment = (commentObj) => fetch(`${clientCredentials.databaseURL}/comments`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(commentObj),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating comment:', error);
    throw error;
  });

const updateComment = (commentId, updatedCommentObj) => fetch(`${clientCredentials.databaseURL}/comments/${commentId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedCommentObj),
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to update comment');
  })
  .catch((error) => {
    console.error('Error updating comment:', error);
    throw error;
  });

const deleteComment = (commentId) => fetch(`${clientCredentials.databaseURL}/comments/${commentId}`, {
  method: 'DELETE',
})
  .then((response) => {
    if (response.ok) {
      console.warn('Comment deleted successfully');
    } else {
      throw new Error('Failed to delete comment');
    }
  })
  .catch((error) => {
    console.error('Error deleting comment:', error);
    throw error;
  });

export {
  getCommentsByProduct,
  createComment,
  updateComment,
  deleteComment,
};
