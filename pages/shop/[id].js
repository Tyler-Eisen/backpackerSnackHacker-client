import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import { getProductsByShop } from '../../utils/data/productData';

function ShopProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { id: shopId } = router.query;

  const showProducts = () => {
    console.warn({ shopId });
    getProductsByShop(shopId).then((data) => setProducts(data));
  };

  useEffect(() => {
    showProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onUpdate={showProducts} />
        ))}
      </div>
      <Button
        className="create-btn"
        onClick={() => {
          router.push(`/product/new?shopId=${shopId}`);
        }}
      >
        Create New Product
      </Button>
    </div>
  );
}

export default ShopProducts;
