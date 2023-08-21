import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import CityCard from '../components/CityCard';
import { getCities } from '../utils/data/cityData';

function Home() {
  const { user } = useAuth();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities().then((data) => {
      setCities(data);
    });
  }, []);

  return (
    <div
      className="home-container"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1 className="home-title">Hello {user.fbUser.displayName}! </h1>
      <h2 className="cities-title">Cities:</h2>
      <div className="city-card-container">
        {cities.map((city) => (
          <section key={`city--${city.id}`} className="city">
            <CityCard cityObj={city} />
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
