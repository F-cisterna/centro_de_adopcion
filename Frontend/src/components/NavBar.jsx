import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkStyle = {
  padding: '8px 16px',
  borderRadius: '10px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#666666',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  textDecoration: 'none',
};

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{width: '100%', backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F0F0', boxShadow: '0 2px 12px rgba(232,96,60,0.07)'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>

        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{width: '36px', height: '36px', backgroundColor: '#E8603C', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg viewBox="0 0 24 24" style={{width: '20px', height: '20px', fill: 'white'}}>
              <ellipse cx="12" cy="17" rx="5" ry="4"/>
              <ellipse cx="5" cy="13" rx="2.5" ry="2"/>
              <ellipse cx="19" cy="13" rx="2.5" ry="2"/>
              <ellipse cx="8" cy="8" rx="2" ry="2.5"/>
              <ellipse cx="16" cy="8" rx="2" ry="2.5"/>
            </svg>
          </div>
          <span style={{fontFamily: 'Poppins, sans-serif', fontWeight: '700', fontSize: '17px', color: '#1A1A1A'}}>Centro Adopción</span>
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
          {user?.role === 'ROLE_ADMIN' && (
            <>
              <Link to="/admin/refugios" style={linkStyle}>Refugios</Link>
              <Link to="/admin/animales" style={linkStyle}>Animales</Link>
              <Link to="/admin/adoptantes" style={linkStyle}>Adoptantes</Link>
              <Link to="/solicitudes" style={linkStyle}>Solicitudes</Link>
              <Link to="/admin/seguimientos" style={linkStyle}>Seguimientos</Link>
            </>
          )}
          {user?.role === 'ROLE_USER' && (
            <>
              <Link to="/catalogo" style={linkStyle}>Catálogo</Link>
              <Link to="/solicitudes" style={linkStyle}>Mis Solicitudes</Link>
            </>
          )}
        </div>

        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '500', color: '#E8603C', backgroundColor: '#FFF0EC', padding: '6px 14px', borderRadius: '8px'}}>
            {user?.username}
          </span>
          <button
            onClick={logout}
            style={{padding: '8px 18px', backgroundColor: '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
          >
            Cerrar Sesión
          </button>
        </div>

      </div>
    </nav>
  );
};

export default NavBar;
