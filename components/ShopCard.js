/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { favoriteShop, getCityShops, unfavoriteShop } from '../utils/data/shopData';
import { useAuth } from '../utils/context/authContext';

function ShopCard({
  shopObj,
  onUpdate,
}) {
  console.warn({ favorited: shopObj.favorited });
  const [shopDetails, setShopDetails] = useState({});
  const { user } = useAuth();
  const favorite = () => favoriteShop(shopObj.id, user.uid).then(() => onUpdate());
  const unfavorite = () => unfavoriteShop(shopObj.id, user.uid).then(() => onUpdate());

  /* Defining a useEffect hook to load the shop details when the component mounts or when the shopObj prop changes */
  useEffect(() => {
    console.warn('uid:', user.uid);
    console.warn('shopObj:', { shopObj });
    getCityShops(shopObj.cityId.id).then(setShopDetails);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopObj]);

  const cardStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#1E1E1E',
    color: '#fff',
    margin: '10px',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const cardImageStyles = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginRight: '20px',
  };

  return (
    <>
      <Head>
        <title>{shopObj.name}</title>
      </Head>
      <Card style={cardStyles}>
        {shopDetails.imageUrl && <img src={shopDetails.imageUrl} alt={shopDetails.name} style={cardImageStyles} />}
        <div>
          <h3>{shopObj.name}</h3>
          <p>Address: {shopObj.address}</p>
          <Link href={`/shop/${shopObj.id}`} passHref>
            <p style={{ cursor: 'pointer' }}>View Details</p>
          </Link>
        </div>
        {
        shopObj.favorited
          ? <Button className="btn-danger" onClick={unfavorite}>Unfavorite</Button>
          : <Button className="btn-success" onClick={favorite}>Favorite</Button>
      }
      </Card>
    </>
  );
}

ShopCard.propTypes = {
  shopObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    favorited: PropTypes.number.isRequired,
    cityId: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      // ... other city properties if necessary
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ShopCard;
