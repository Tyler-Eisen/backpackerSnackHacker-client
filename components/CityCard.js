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

  return (
    <>
      <Head>
        <title>{cityDetails.name}</title>
      </Head>
      <Card className="city-card">
        <img src={cityObj.image_url} alt={cityObj.name} />
        <div>
          <Link href={`/city/${cityObj.id}`} passHref>
            <h3 style={{ cursor: 'pointer' }}>{cityDetails.name}</h3>
          </Link>
        </div>
      </Card>

    </>
  );
}

CityCard.propTypes = {
  cityObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image_url: PropTypes.string,

  }).isRequired,
};

export default CityCard;
