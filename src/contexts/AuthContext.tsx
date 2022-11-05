import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';


type UserContext = {
  user: User;
  authenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => void | boolean;
  logout: () => void;
}

type User = {
  id: string;
  email: string;
  userType: string;
}

export const AuthContext = createContext({} as UserContext);


interface Props {
  children?: ReactNode
}

export const AuthProvider = ({children} : Props) => {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, [])
  

  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    setLoading(true);

    const loginUrl = `user/login/${email}/${password}`;

    api.get(loginUrl).then((response) => {
      if (response.status === 200) {
        const {id, email, userType} = response.data.schema;
        const loggedUser = {
          id,
          email,
          userType
        };

        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        setLoading(false);
        setAuthenticated(true);
        navigate('/app');
      }
    });
  }

  const logout = () => {
    localStorage.removeItem('user');
    setUser({} as User);
    setAuthenticated(false);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{authenticated, user, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}