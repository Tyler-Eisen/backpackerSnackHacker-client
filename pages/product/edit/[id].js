import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getProductById } from '../../../utils/data/productData';
import UpdateProductForm from '../../../components/UpdateProductForm';

export default function EditProduct() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  return (
    <>
      <Head>
        <title>Update {product.name} </title>
      </Head>
      <UpdateProductForm product={product} />
    </>
  );
}
