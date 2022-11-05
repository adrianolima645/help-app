import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map_marker.svg';
import '../styles/pages/touristic-points-map.css';

import mapIcon from '../utils/mapIcon';
import { AuthContext } from '../contexts/AuthContext';
// import api from '../services/api';

interface TouristicPoint {
  id: string;
  latitude: number;
  longitude: number;
  name: string;
}

function TouristicPointsMap() {
  let listTouristicPointsMock: TouristicPoint[] = [
    {
      id: "0124545",
      latitude: -22.588334,
      longitude: -46.524675,
      name: "Praça da Matriz",
    }
  ];
  const [getTouristicPoints, setTouristicPoints] = useState<TouristicPoint[]>([]);
  const {logout} = useContext(AuthContext);

  // useEffect(() => {
  //   api.get('orphanages').then((response) => {
  //     setOrphanages(response.data);
  //   });
  // }, []);

  useEffect(() => {
      setTouristicPoints(listTouristicPointsMock);
    }, []);

  
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={''} alt="Help!" />
          <h2>Escolha um ponto turístico no mapa</h2>
          <p>Aqui você vai encontrar os melhores pontos comerciais e turísticos da cidade!</p>
        </header>
        <footer>
          <strong>Socorro</strong>
          <span>São Paulo</span>
          <button onClick={logout}>Logout</button>
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

        {getTouristicPoints.map((touristicPoint) => {
          return (
            <Marker
              key={touristicPoint.id}
              icon={mapIcon}
              position={[touristicPoint.latitude, touristicPoint.longitude]}
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
      <Link to="/touristic-points/create" className="create-touristic-point">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default TouristicPointsMap;
