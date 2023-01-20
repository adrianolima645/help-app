import { useEffect, useState } from 'react';
import { FaChrome, FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Link, useParams } from 'react-router-dom';
import '../styles/pages/touristic-point.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import AssessmentList from '../components/AssessmentList';
import SponsoredSection from '../components/section/SponsoredSection';

interface TouristicPointInterface {
  id: string;
  geolocation: {
    id: number,
    latitude: number,
    longitude: number,
  };
  name: string;
  about: string;
  instructions: string;
  openingHours: string;
  petFriendly: boolean;
  pictures: Array<{
    _id:number;
    location: string;
    originalname:string;
  }>;
  sponsored: boolean;
  website: string;
  facebook: string;
  instagram: string;
  youtube: string;
  whatsappNumber: string;
}

type TouristicPointParams = {
  id: string;
}

type AssessmentType = {
  id: string;
  author: string;
  description: string;
  rating: number;
  userId: string;
}

export default function TouristicPoint() {
  const params = useParams<TouristicPointParams>();

  const [getTouristicPoint, setTouristicPoint] = useState<TouristicPointInterface>();
  const [getActiveImageIndex, setActiveImageIndex] = useState(0)
  const [getAssessmentList, setAssessmentList] = useState<AssessmentType[]>([]); 

  useEffect(() => {
    api.get(`touristicpoint/${params.id}`).then((response) => {
      setTouristicPoint(response.data.schema);
    });

    api.get(`assessment/findByTouristicPoint/${params.id}`).then((response) => {
      setAssessmentList(response.data.schema);
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
          <img src={getTouristicPoint.pictures[getActiveImageIndex].location} alt={getTouristicPoint.pictures[getActiveImageIndex].originalname} />

          <div className="images">
            { getTouristicPoint.pictures.map((image,index) => {
                return (
                  <button 
                    key={image._id} 
                    className={getActiveImageIndex===index ? 'active' : ''} 
                    type="button" 
                    onClick={()=>{
                    setActiveImageIndex(index);
                    }}
                  >
                    <img
                      src={image.location}
                      alt={image.originalname}
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
                center={[getTouristicPoint.geolocation.latitude, getTouristicPoint.geolocation.longitude]}
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
                  position={[getTouristicPoint.geolocation.latitude, getTouristicPoint.geolocation.longitude]}
                />
              </MapContainer>

              <footer>
                <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${getTouristicPoint.geolocation.latitude},${getTouristicPoint.geolocation.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {getTouristicPoint.openingHours}
              </div>
              {
                getTouristicPoint.petFriendly ?(
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

            { getTouristicPoint.sponsored && 
              <SponsoredSection 
                website={getTouristicPoint.website}
                facebook={getTouristicPoint.facebook}
                instagram={getTouristicPoint.instagram}
                youtube={getTouristicPoint.youtube}
                whatsappNumber={getTouristicPoint.whatsappNumber}
                /> 
            }

            <hr />
            <div className='assessment-section'>
              <h2>Avaliações</h2>
              <Link className='link' to={`/assessment/create/${getTouristicPoint.id}`} >+ Avaliar Local</Link>
            </div>
            

            <AssessmentList assessmentList={getAssessmentList}/>

          </div>
        </div>
      </main>
    </div>
  );
}
