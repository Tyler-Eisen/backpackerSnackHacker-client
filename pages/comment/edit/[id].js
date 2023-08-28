import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCommentById } from '../../../utils/data/commentData';
import UpdateCommentForm from '../../../components/updateCommentForm';

export default function EditComment() {
  const [comment, setComment] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getCommentById(id).then(setComment);
  }, [id]);

  return (
    <>
      <Head>
        <title>Update Comment </title>
      </Head>
      <UpdateCommentForm comment={comment} />
    </>
  );
}
