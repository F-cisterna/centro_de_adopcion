import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const parts = decoded.sub ? decoded.sub.split('#') : [];
        setUser({
          username: parts.length > 1 ? parts[1] : decoded.sub,
          role: parts.length > 2 ? parts[2] : decoded.roles,
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('jwt');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('jwt', token);
    const decoded = jwtDecode(token);
    const parts = decoded.sub ? decoded.sub.split('#') : [];
    setUser({
      username: parts.length > 1 ? parts[1] : decoded.sub,
      role: parts.length > 2 ? parts[2] : decoded.roles,
    });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
