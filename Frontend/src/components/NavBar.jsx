import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <nav style={{width: '100%', backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F0F0', boxShadow: '0 2px 12px rgba(232,96,60,0.07)', position: 'relative', overflow: 'hidden'}}>
      {/* Patitas decorativas en el NavBar */}
      <span style={{position: 'absolute', top: '15px', left: '3%', fontSize: '24px', opacity: 0.06, transform: 'rotate(-15deg)', userSelect: 'none', pointerEvents: 'none'}}>🐾</span>
      <span style={{position: 'absolute', top: '10px', left: '18%', fontSize: '24px', opacity: 0.05, transform: 'rotate(15deg)', userSelect: 'none', pointerEvents: 'none'}}>🐾</span>
      <span style={{position: 'absolute', top: '25px', left: '28%', fontSize: '18px', opacity: 0.05, transform: 'rotate(-20deg)', userSelect: 'none', pointerEvents: 'none'}}>🐾</span>
      <span style={{position: 'absolute', top: '15px', right: '30%', fontSize: '22px', opacity: 0.05, transform: 'rotate(25deg)', userSelect: 'none', pointerEvents: 'none'}}>🐾</span>
      <span style={{position: 'absolute', top: '25px', right: '22%', fontSize: '18px', opacity: 0.05, transform: 'rotate(-10deg)', userSelect: 'none', pointerEvents: 'none'}}>🐾</span>

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1}}>

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
              <Link to="/admin/refugios" onMouseEnter={() => setHoveredLink('refugios')} onMouseLeave={() => setHoveredLink(null)} style={{padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter, sans-serif', textDecoration: 'none', border: 'none', cursor: 'pointer', backgroundColor: hoveredLink === 'refugios' ? '#FFF0EC' : 'transparent', color: hoveredLink === 'refugios' ? '#E8603C' : '#666666', transition: 'all 0.15s ease'}}>Refugios</Link>
              <Link to="/admin/animales" onMouseEnter={() => setHoveredLink('animales')} onMouseLeave={() => setHoveredLink(null)} style={{padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter, sans-serif', textDecoration: 'none', border: 'none', cursor: 'pointer', backgroundColor: hoveredLink === 'animales' ? '#FFF0EC' : 'transparent', color: hoveredLink === 'animales' ? '#E8603C' : '#666666', transition: 'all 0.15s ease'}}>Animales</Link>
              <Link to="/admin/adoptantes" onMouseEnter={() => setHoveredLink('adoptantes')} onMouseLeave={() => setHoveredLink(null)} style={{padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter, sans-serif', textDecoration: 'none', border: 'none', cursor: 'pointer', backgroundColor: hoveredLink === 'adoptantes' ? '#FFF0EC' : 'transparent', color: hoveredLink === 'adoptantes' ? '#E8603C' : '#666666', transition: 'all 0.15s ease'}}>Adoptantes</Link>
              <Link to="/solicitudes" onMouseEnter={() => setHoveredLink('solicitudes_admin')} onMouseLeave={() => setHoveredLink(null)} style={{padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter, sans-serif', textDecoration: 'none', border: 'none', cursor: 'pointer', backgroundColor: hoveredLink === 'solicitudes_admin' ? '#FFF0EC' : 'transparent', color: hoveredLink === 'solicitudes_admin' ? '#E8603C' : '#666666', transition: 'all 0.15s ease'}}>Solicitudes</Link>
              <Link to="/admin/seguimientos" onMouseEnter={() => setHoveredLink('seguimientos')} onMouseLeave={() => setHoveredLink(null)} style={{padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter, sans-serif', textDecoration: 'none', border: 'none', cursor: 'pointer', backgroundColor: hoveredLink === 'seguimientos' ? '#FFF0EC' : 'transparent', color: hoveredLink === 'seguimientos' ? '#E8603C' : '#666666', transition: 'all 0.15s ease'}}>Seguimientos</Link>
            </>
          )}
          {user?.role === 'ROLE_USER' && (
            <>
              <Link to="/catalogo" onMouseEnter={() => setHoveredLink('catalogo')} onMouseLeave={() => setHoveredLink(null)} style={{padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter, sans-serif', textDecoration: 'none', border: 'none', cursor: 'pointer', backgroundColor: hoveredLink === 'catalogo' ? '#FFF0EC' : 'transparent', color: hoveredLink === 'catalogo' ? '#E8603C' : '#666666', transition: 'all 0.15s ease'}}>Catálogo</Link>
              <Link to="/solicitudes" onMouseEnter={() => setHoveredLink('mis_solicitudes')} onMouseLeave={() => setHoveredLink(null)} style={{padding: '8px 16px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', fontFamily: 'Inter, sans-serif', textDecoration: 'none', border: 'none', cursor: 'pointer', backgroundColor: hoveredLink === 'mis_solicitudes' ? '#FFF0EC' : 'transparent', color: hoveredLink === 'mis_solicitudes' ? '#E8603C' : '#666666', transition: 'all 0.15s ease'}}>Mis Solicitudes</Link>
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
