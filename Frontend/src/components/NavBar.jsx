import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold text-gray-800">Centro Adopción</h1>
        <div className="hidden md:flex space-x-4">
          {user?.role === 'ROLE_ADMIN' && (
            <>
              <Link to="/admin/refugios" className="text-gray-600 hover:text-blue-600 font-medium">Gestión de Refugios</Link>
              <Link to="/admin/animales" className="text-gray-600 hover:text-blue-600 font-medium">Gestión de Animales</Link>
              <Link to="/admin/adoptantes" className="text-gray-600 hover:text-blue-600 font-medium">Adoptantes</Link>
              <Link to="/solicitudes" className="text-gray-600 hover:text-blue-600 font-medium">Solicitudes</Link>
              <Link to="/admin/seguimientos" className="text-gray-600 hover:text-blue-600 font-medium">Seguimientos</Link>
            </>
          )}
          {user?.role === 'ROLE_USER' && (
            <>
              <Link to="/catalogo" className="text-gray-600 hover:text-blue-600 font-medium">Catálogo de Mascotas</Link>
              <Link to="/solicitudes" className="text-gray-600 hover:text-blue-600 font-medium">Mis Solicitudes</Link>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <p className="text-gray-800 font-semibold">{user?.username}</p>
          <p className="text-gray-500 text-xs">{user?.role === 'ROLE_ADMIN' ? 'Administrador' : 'Adoptante'}</p>
        </div>
        <button 
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
