import React, { useEffect, useState } from 'react';
import { FaChrome, FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { Link, useParams } from 'react-router-dom';

import mapMarkerImg from '../images/map_marker.svg';

import '../styles/pages/touristic-point.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import AssessmentList from '../components/AssessmentList';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface TouristicPointInterface {
  geolocalization: {
    id: number,
    latitude: number,
    longitude: number,
  };
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  pet_friendly: boolean;
  pictures: Array<{
    id:number;
    url: string;
  }>;
}


type TouristicPointParams = {
  id: string;
}

type AssessmentType = {
  id: string;
  author: string;
  description: string;
  rating: number;
}

export default function TouristicPoint() {
  const params = useParams<TouristicPointParams>();
  let obj :TouristicPointInterface = {
    geolocalization: {
      id: 0,
      latitude: -22.588334,
      longitude:  -46.524675 ,
    },
    name: "Praça da Matriz",
    about: "Praça da Matriz",
    instructions: "Praça da Matriz",
    opening_hours: "Praça da Matriz",
    pet_friendly: true,
    pictures: [
      {
        id: 1,
        url: "https://picsum.photos/id/237/200/300",
      },
      {
        id: 2,
        url: "https://picsum.photos/id/238/200/300",
      },
      {
        id: 3,
        url: "https://picsum.photos/id/239/200/300",
      },
      {
        id: 4,
        url: "https://picsum.photos/id/240/200/300",
      },
    ]
  };

  let assessmentList:AssessmentType[]  = [
    {
      id: 'string',
      author: 'Adriano Lima',
      description: 'O parque da cidade possui atrações para todos as idades, perfeito para prática de esportes poir conta com quadras de areia e poliesportivas...',
      rating: 5
    },
    {
      id: 'string',
      author: 'Lucio José',
      description: 'O parque da cidade possui atrações para todos as idades, perfeito para prática de esportes poir conta com quadras de areia e poliesportivas...',
      rating: 2
    },
    {
      id: 'string',
      author: 'Bruna Formigoni',
      description: 'O parque da cidade possui atrações para todos as idades, perfeito para prática de esportes poir conta com quadras de areia e poliesportivas...',
      rating: 4
    },
  ];

  const [getTouristicPoint, setTouristicPoint] = useState<TouristicPointInterface>(obj);
  const [getActiveImageIndex, setActiveImageIndex] = useState(0);
  const [getAssessmentList, setAssessmentList] = useState(assessmentList);
  useEffect(() => {
    api.get(`touristicPoint/${params.id}`).then((response) => {
      setTouristicPoint(response.data.schema);
    });
  }, []);

  if (!getTouristicPoint) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-touristic-point">
      <Sidebar />
      <main>
        <div className="touristic-point-details">
          <img src={getTouristicPoint.pictures[getActiveImageIndex].url} alt={getTouristicPoint.name} />

          <div className="images">
            { getTouristicPoint.pictures.map((image,index) => {
                return (
                  <button 
                    key={image.id} 
                    className={getActiveImageIndex===index ? 'active' : ''} 
                    type="button" 
                    onClick={()=>{
                    setActiveImageIndex(index);
                    }}
                  >
                    <img
                      src={image.url}
                      alt="Lar das meninas"
                    />
                  </button>
                );
            })}
          </div>

          <div className="touristic-point-details-content">
            <h1>{getTouristicPoint.name}</h1>
            <p>{getTouristicPoint.about}</p>

            <div className="map-container">
              <MapContainer
                center={[getTouristicPoint.geolocalization.latitude, getTouristicPoint.geolocalization.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWRyaWFub2xpbWE2NDUiLCJhIjoiY2tnOHAyOWFmMDA5eDJxcDVuM3FwbDBlbCJ9.vJxoMiSdFI5-fZrXZspTrQ`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[getTouristicPoint.geolocalization.latitude, getTouristicPoint.geolocalization.longitude]}
                />
              </MapContainer>

              <footer>
                <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${getTouristicPoint.geolocalization.latitude},${getTouristicPoint.geolocalization.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {getTouristicPoint.opening_hours}
              </div>
              {
                getTouristicPoint.pet_friendly ?(
                  <div className="pet-friendly">
                    <FiInfo size={32} color="#39CC83" />
                    Pet Friendly
                  </div>
                ):<div className="pet-friendly dont-pet-friendly">
                <FiInfo size={32} color="#ff6690" />
                Não aceitamos <br />
                animais de estimação
              </div>}
            </div>

            <hr />

            <h2>Informações adicionais</h2>

            <div className="info-details">
              <div className="hour">
                <FaFacebook size={64} color="#15B6D6" />
              </div>
              <div className="hour">
                <FaInstagram size={64} color="#15B6D6" />
              </div>
              <div className="hour">
                <FaYoutube size={64} color="#15B6D6" />
              </div>
              <div className="hour">
                <FaChrome size={64} color="#15B6D6" />
              </div>
              
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>

            <hr />
            <div className='assessment-section'>
              <h2>Avaliações</h2>
              <Link className='link' to="/assessment/create" >+ Avaliar Local</Link>
            </div>
            

            <AssessmentList assessmentList={getAssessmentList}/>

          </div>
        </div>
      </main>
    </div>
  );
}
