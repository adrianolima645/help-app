import React from 'react';

import mapMarkerImg from '../images/map_marker.svg';
import { FiArrowLeft } from 'react-icons/fi';

import '../styles/components/sidebar.css';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={() => navigate(-1)}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
