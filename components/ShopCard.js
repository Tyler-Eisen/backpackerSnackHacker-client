/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import getCityShops from '../utils/data/shopData';

function ShopCard({ shopObj }) {
  /* Defining a state variable shopDetails using the useState hook */
  const [shopDetails, setShopDetails] = useState({});

  /* Defining a useEffect hook to load the shop details when the component mounts or when the shopObj prop changes */
  useEffect(() => {
    getCityShops(shopObj.cityId.id).then(setShopDetails);
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
    cityId: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      // ... other city properties if necessary
    }).isRequired,
  }).isRequired,
};

export default ShopCard;
