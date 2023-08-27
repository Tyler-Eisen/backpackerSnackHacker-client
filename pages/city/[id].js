import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ShopCard from '../../components/ShopCard';
import getCityShops from '../../utils/data/shopData';

function CityShops() {
  const [shops, setShops] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const showShops = () => {
    getCityShops(id).then((data) => {
      console.warn({ data });
      setShops(data);
      console.warn({ shops });
    });
  };

  useEffect(() => {
    showShops();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                cityId: {
                  id: shop.city_id.id,
                  name: shop.city_id.name,
                  // add other city properties here if needed
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CityShops;
