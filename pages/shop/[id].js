import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import { getProductsByShop } from '../../utils/data/productData';
import { getSingleShop } from '../../utils/data/shopData';

function ShopProducts() {
  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState([]);
  const router = useRouter();
  const { id: shopId } = router.query;

  const showProducts = () => {
    getProductsByShop(shopId).then((data) => setProducts(data));
  };

  const getShop = () => {
    getSingleShop(shopId).then((data) => setShop(data));
  };

  useEffect(() => {
    getShop();
    showProducts();
    console.warn('Shop Object:', shop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div className="summary-container col-md-4 p-4" style={{ flex: '0 0 25%', height: '100%', overflowY: 'auto' }}>
        <h1>{shop.name}</h1>
        <img src={shop.image_url} alt={shop.name} />
        <h1>{shop.address}</h1>
        <Button
          className="create-btn"
          onClick={() => {
            router.push(`/product/new?shopId=${shopId}`);
          }}
        >
          Create New Product
        </Button>
      </div>
      <div
        className="card-container col-md-8 p-4"
        style={{
          flex: '0 0 75%',
          fontSize: '1rem',
          height: '100%',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap', // This ensures elements wrap to the next row
        }}
      >
        <h1>Products</h1>
        <div className="productContainer">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onUpdate={showProducts} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopProducts;
