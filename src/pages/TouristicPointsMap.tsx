import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/pages/touristic-points-map.css';
import mapIcon from '../utils/mapIcon';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import { GoogleLogout } from 'react-google-login';
import logoImg from '../images/logo.svg';

interface TouristicPoint {
  id: string;
  geolocation: {
    latitude: number;
    longitude: number;
  }
  name: string;
}

type User = {
  id: string;
  email: string;
  userType: string;
  fullName: string;
}


function TouristicPointsMap() {
  const [getTouristicPoints, setTouristicPoints] = useState<TouristicPoint[]>([]);
  const [user, setUser] = useState({} as User);
  const {logout} = useContext(AuthContext);
  const clientId = "671572362786-g7s2p7tupvguvlu0od7314rojfl7sj4l.apps.googleusercontent.com";

  useEffect(() => {
    api.get('touristicPoint/findByStatus/true').then((response) => {
      const result = response.data.schema;

      const touristicPoints = result.map((item: TouristicPoint) => {
        return {
          id: item.id,
          name: item.name,
          geolocation: {
            latitude: item.geolocation.latitude,
            longitude: item.geolocation.longitude,
          }
        };
      });

      setTouristicPoints(touristicPoints);
    });

    const recoveredUser = localStorage.getItem('user');
    
    if (recoveredUser) {
        setUser(JSON.parse(recoveredUser));
    }
  }, []);
  
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={logoImg} alt="Help!" />
          <h1>Olá {user.fullName}</h1>
          <h2>Escolha um ponto turístico no mapa</h2>
          <p>Aqui você vai encontrar os melhores pontos comerciais e turísticos da cidade!</p>
        </header>
        <footer>
          <strong>Socorro</strong>
          <span>São Paulo</span>
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
            render={renderProps => (
              <button className='logout-button'
                type="button"
                onClick={renderProps.onClick}
              >Logout</button>
            )}
          />
        </footer>
      </aside>

      <MapContainer
        center={[-22.588334, -46.524675]}
        zoom={18}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWRyaWFub2xpbWE2NDUiLCJhIjoiY2tnOHAyOWFmMDA5eDJxcDVuM3FwbDBlbCJ9.vJxoMiSdFI5-fZrXZspTrQ`}
        />

        {getTouristicPoints.map((touristicPoint: TouristicPoint) => {
          return (
            <Marker
              key={touristicPoint.id}
              icon={mapIcon}
              position={[touristicPoint.geolocation.latitude,touristicPoint.geolocation.longitude]}
            >
              <Popup
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                {touristicPoint.name}
                <Link to={`/touristic-point/${touristicPoint.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      {user.userType === "admin" && 
        <Link to="/touristic-point/create" className="create-touristic-point">
          <FiPlus size={32} color="#fff" />
        </Link>
      }   
    </div>
  );
}

export default TouristicPointsMap;
