/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../utils/data/productData';
import ProductCard from '../../components/ProductCard';

export default function SearchBar() {
  const [searchProducts, setSearchProducts] = useState([]);

  const router = useRouter();
  const { searchbar } = router.query;

  const searchAllProducts = () => {
    getProducts().then((products) => {
      const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchbar?.toLowerCase()));
      const sortedProducts = filteredProducts.sort((a, b) => ((a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1));
      setSearchProducts(sortedProducts);
    });
  };

  useEffect(() => {
    searchAllProducts();
    return () => {
      setSearchProducts([]);
    };
  }, [searchbar]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {searchProducts.map((product) => (
          <div className="d-flex" key={product.id}>
            <ProductCard product={product} onUpdate={searchAllProducts} />
          </div>
        ))}
      </div>
    </>
  );
}
