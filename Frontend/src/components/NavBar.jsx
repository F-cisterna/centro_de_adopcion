import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-[0_2px_12px_rgba(232,96,60,0.08)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E8603C] rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
              <ellipse cx="7" cy="4.5" rx="2.5" ry="2" />
              <ellipse cx="17" cy="4.5" rx="2.5" ry="2" />
              <ellipse cx="3.5" cy="10" rx="2" ry="2.5" />
              <ellipse cx="20.5" cy="10" rx="2" ry="2.5" />
              <path d="M12 22c-4 0-7-3-7-6.5 0-3 2.5-5.5 4-7s2-2.5 3-2.5 1.5 1 3 2.5 4 4 4 7c0 3.5-3 6.5-7 6.5z" />
            </svg>
          </div>
          <span className="font-poppins font-bold text-gray-900 text-lg">Centro Adopción</span>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1">
          {user?.role === 'ROLE_ADMIN' && (
            <>
              <Link to="/admin/refugios" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#E8603C] hover:bg-orange-50 transition-colors">Refugios</Link>
              <Link to="/admin/animales" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#E8603C] hover:bg-orange-50 transition-colors">Animales</Link>
              <Link to="/admin/adoptantes" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#E8603C] hover:bg-orange-50 transition-colors">Adoptantes</Link>
              <Link to="/solicitudes" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#E8603C] hover:bg-orange-50 transition-colors">Solicitudes</Link>
              <Link to="/admin/seguimientos" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#E8603C] hover:bg-orange-50 transition-colors">Seguimientos</Link>
            </>
          )}
          {user?.role === 'ROLE_USER' && (
            <>
              <Link to="/catalogo" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#E8603C] hover:bg-orange-50 transition-colors">Catálogo</Link>
              <Link to="/solicitudes" className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-[#E8603C] hover:bg-orange-50 transition-colors">Mis Solicitudes</Link>
            </>
          )}
        </nav>

        {/* User info + Logout */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block bg-orange-50 text-[#E8603C] text-xs font-medium px-3 py-1.5 rounded-lg">
            {user?.username}
          </span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-[#E8603C] hover:bg-[#d14f2b] text-white text-sm font-medium rounded-xl transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
