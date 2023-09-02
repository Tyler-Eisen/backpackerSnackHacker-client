import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ShopCard from '../../components/ShopCard';
import { getCityShops } from '../../utils/data/shopData';
import { useAuth } from '../../utils/context/authContext';

function CityShops() {
  const [shops, setShops] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const showShops = () => {
    getCityShops(id, user.uid).then((data) => {
      console.warn({ data });
      setShops(data);
      console.warn({ shops });
    });
  };

  useEffect(() => {
    showShops();
  }, [id]);

  return (
    <div>
      <h1>Shops</h1>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {shops.map((shop) => (
          <div key={`shop--${shop.id}`} className="shop">
            <ShopCard
              shopObj={{
                id: shop.id,
                address: shop.address,
                name: shop.name,
                imageUrl: shop.image_url,
                favorited: shop.favorited,
                cityId: {
                  id: shop.city_id.id,
                  name: shop.city_id.name,
                },
              }}
              onUpdate={showShops}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CityShops;
