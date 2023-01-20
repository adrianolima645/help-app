import { ReactNode, useContext, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Questionary from './pages/Questionary';
import TouristicPointsMap from './pages/TouristicPointsMap';
import CreateTouristicPoint from './pages/CreateTouristicPoint';
import TouristicPoint from './pages/TouristicPoint';
import AssessmentCreate from './pages/CreateAssessment';
import UpdateTouristicPoint from './pages/UpdateTouristicPoint';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

function MyRoutes() {

  interface Props {
    children: JSX.Element
  }

  const Private = ({children}: Props) => {
    const {authenticated, loading} = useContext(AuthContext);

    if (loading) {
      return <div className="carregando">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }

    return children;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<Private><TouristicPointsMap /></Private>} />
          <Route path="/register" element={<Register />} />
          <Route path="/questionary" element={<Questionary />} />

          <Route path="/touristic-point/create" element={<CreateTouristicPoint/>} />
          <Route path="/touristic-point/edit/:id" element={<UpdateTouristicPoint/>} />
          <Route path="/touristic-point/:id" element={<TouristicPoint />} />
          <Route path="/assessment/create/:id" element={<AssessmentCreate />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default MyRoutes;