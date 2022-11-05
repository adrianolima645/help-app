import React, { ReactNode, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Questionary from './pages/Questionary';
import TouristicPointsMap from './pages/TouristicPointsMap';
import CreateTouristicPoint from './pages/CreateTouristicPoint';
import TouristicPoint from './pages/TouristicPoint';
import AssessmentCreate from './pages/CreateAssessment';

import { AuthContext, AuthProvider } from './contexts/AuthContext';


function MyRoutes() {

  interface Props {
    children: JSX.Element
    // any props that come into the component
  }

  const Private = ({children}: Props) => {
    const {authenticated, loading} = useContext(AuthContext);

    if (loading) {
      return <div className="carregando">Carregando...</div>;
    }

    console.log("ROUTES", authenticated);
    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route path="/app" element={<Private><TouristicPointsMap /></Private>} />
          <Route path="/register" element={<Register />} />
          <Route path="/questionary" element={<Questionary />} />

          <Route path="/touristic-points/create" element={<CreateTouristicPoint/>} />
          <Route path="/touristic-point/:id" element={<TouristicPoint />} />
          <Route path="/assessment/create" element={<AssessmentCreate />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default MyRoutes;