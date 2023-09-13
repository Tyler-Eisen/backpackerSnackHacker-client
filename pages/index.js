import { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
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
    <div className="home-container">
      <Image src="/images/bpsh.png" width="200" height="190" alt="logo" style={{ marginTop: '10px' }} />
      <h1 className="home-title">Hello {user.fbUser.displayName}!</h1>
      <h2 className="cities-title">Below you&apos;ll find our city selection</h2>
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
