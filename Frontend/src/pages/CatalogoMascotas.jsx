import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import NavBar from '../components/NavBar';

const CatalogoMascotas = () => {
  const [animales, setAnimales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimales();
  }, []);

  const fetchAnimales = async () => {
    try {
      
      const [resAnimales, resSolicitudes] = await Promise.all([
        axiosInstance.get('/api/animales'),
        axiosInstance.get('/api/solicitudes')
      ]);

      
      const animalesAprobadosIds = resSolicitudes.data
        .filter(sol => sol.estado === 'Aprobada')
        .map(sol => sol.animal?.id);

      
      const animalesDisponibles = resAnimales.data.filter(
        animal => !animalesAprobadosIds.includes(animal.id)
      );

      // 4. Guardamos la lista limpia en el estado
      setAnimales(animalesDisponibles);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F5]">
      <NavBar />

      {/* Page header */}
      <div className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-poppins text-2xl font-bold text-gray-900">Catálogo de Mascotas</h1>
          <p className="text-sm text-gray-500 mt-1">Encuentra a tu compañero perfecto 🐾</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <p className="text-center text-gray-400 text-sm py-16">Cargando mascotas...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animales.map((animal) => (
              <div
                key={animal.id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-gray-100 hover:shadow-[0_4px_24px_rgba(232,96,60,0.12)] hover:border-orange-100 transition-all duration-200"
              >
                {/* Image placeholder */}
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 h-48 flex items-center justify-center">
                  <span className="text-6xl opacity-30 select-none">🐾</span>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="font-poppins font-bold text-gray-900 text-lg mb-3">{animal.nombre}</h3>

                  {/* Attributes grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Especie</p>
                      <p className="text-sm text-gray-700 font-medium mt-0.5 capitalize">{animal.especie}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Raza</p>
                      <p className="text-sm text-gray-700 font-medium mt-0.5 capitalize">{animal.raza}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Tamaño</p>
                      <p className="text-sm text-gray-700 font-medium mt-0.5 capitalize">{animal.tamanio}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Salud</p>
                      <p className="text-sm text-gray-700 font-medium mt-0.5 capitalize">{animal.estadoSalud}</p>
                    </div>
                  </div>

                  {/* Availability badge */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      Disponible para adopción
                    </span>
                  </div>

                  {/* Shelter info */}
                  <div className="border-t border-gray-100 mt-4 pt-3">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      📍 <span className="text-[#E8603C] font-medium">{animal.refugio?.nombre || 'Sin refugio'}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {animales.length === 0 && (
              <p className="col-span-full text-center text-gray-400 text-sm py-16">No hay mascotas disponibles en este momento.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoMascotas;
