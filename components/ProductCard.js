/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteProduct } from '../utils/data/productData';

function ProductCard({ product, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();

  console.warn(user);

  const deleteThisProduct = () => {
    if (window.confirm('Delete Post?')) {
      deleteProduct(product.id).then(() => onUpdate());
    }
  };
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} className="product-card-image" />
      <Link href={`/product/${product.id}`} passHref>
        <h3>{product.name}</h3>
      </Link>
      <p>Price: {product.price}</p>

      {user.id === product.user.id && (
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
    user: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
