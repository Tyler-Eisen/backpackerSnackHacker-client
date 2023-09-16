import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { getProductById } from '../../utils/data/productData'; // Adjust the import path as needed
import CommentCard from '../../components/CommentCard';
import { getCommentsByProduct } from '../../utils/data/commentData';
import CommentForm from '../../components/CommentForm';
import { getSingleShop } from '../../utils/data/shopData';

function ProductDetails() {
  const [productDetails, setProductDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [shop, setShop] = useState([]);
  const router = useRouter();
  const { id: productId } = router.query;
  // const { id: shopId } = shop;

  const showProductDetails = () => {
    getProductById(productId).then((data) => {
      setProductDetails(data);
    });
  };

  const showComments = () => {
    getCommentsByProduct(productId).then((data) => {
      setComments(data);
    });
  };

  const getShop = () => {
    getSingleShop(productId).then((data) => setShop(data));
    console.warn('shop:', shop);
  };

  useEffect(() => {
    getShop();
    showProductDetails();
    showComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <>
      <Head>
        <title>{productDetails?.name}</title>
      </Head>
      <div className="commentContainer mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column" />
        <div className="text-white ms-5 details">
          <h5>
            <div className="d-flex flex-column">
              <Image src={productDetails?.image_url} alt={productDetails?.name} style={{ height: '200px', width: '200px' }} />
            </div>
            Name: {productDetails?.name}
            <br />
            Price: {productDetails?.price}
            <br />
            <br />
            Shop: {shop.name}
            <br />
            Location: {shop.address}
          </h5>
        </div>
      </div>
      <div>
        <h2>Comments</h2>
        {comments.map((comment) => (
          <CommentCard key={comment.id} commentObj={comment} onUpdate={() => getCommentsByProduct(productId).then(setComments)} />
        ))}
      </div>
      <div> <CommentForm onUpdate={showComments} />
      </div>
    </>
  );
}

export default ProductDetails;
