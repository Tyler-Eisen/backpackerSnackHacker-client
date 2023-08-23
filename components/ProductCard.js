/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { deleteProduct } from '../utils/data/productData';

function ProductCard({ product, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  console.warn({ product });
  console.warn({ user });

  const deleteThisProduct = () => {
    if (window.confirm('Delete Post?')) {
      deleteProduct(product.id).then(() => onUpdate());
    }
  };
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      {user && user.id === product.user && (
        <>
          <button
            type="button"
            onClick={() => router.push(`/product/edit/${product.id}`)}
          >
            Edit
          </button>
          <button type="button" onClick={deleteThisProduct}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
