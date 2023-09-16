import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteComment } from '../utils/data/commentData';
import { useAuth } from '../utils/context/authContext';

function CommentCard({ commentObj, onUpdate }) {
  const { user } = useAuth();

  if (typeof commentObj !== 'object' || commentObj === null) {
    return null;
  }

  const isCurrentUserComment = user.id === commentObj.user;

  const deleteThisComment = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(commentObj.id).then(() => onUpdate());
    }
  };

  return (
    <div key={commentObj.id} className="mb-3">
      {isCurrentUserComment ? (
        <div className="d-flex justify-content-between">
          <div>
            {commentObj.content}
          </div>
          <div>
            <Link href={`/comment/edit/${commentObj.id}`} passHref>
              <Button>Edit</Button>
            </Link>
            <Button onClick={deleteThisComment}>DELETE</Button>
          </div>
        </div>
      ) : (
        <div>{commentObj.content}</div>
      )}
      <hr />
    </div>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    content: PropTypes.string,
    productId: PropTypes.string,
    user: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
