/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleCity } from '../utils/data/cityData';

function CityCard({ cityObj }) {
  /* Defining a state variable cityDetails using the useState hook */
  const [cityDetails, setCityDetails] = useState({});

  /* Defining a useEffect hook to load the city details when the component mounts or when the cityObj prop changes */
  useEffect(() => {
    getSingleCity(cityObj.id).then(setCityDetails);
  }, [cityObj]);

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
        <title>{cityDetails.name}</title>
      </Head>
      <Card style={cardStyles}>
        <img src={cityDetails.image} alt={cityDetails.name} style={cardImageStyles} />
        <div>
          <Link href={`/city/${cityObj.id}`} passHref>
            <h3 style={{ cursor: 'pointer' }}>{cityDetails.name}</h3>
          </Link>
          <p>{cityObj.country}</p>
          <p>{cityObj.population}</p>
          {/* Add other city properties here */}
        </div>
      </Card>
    </>
  );
}

CityCard.propTypes = {
  cityObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    country: PropTypes.string,
    population: PropTypes.string, // if it's a string or number based on your model
    // add other city properties here for PropTypes if needed
  }).isRequired,
};

export default CityCard;
