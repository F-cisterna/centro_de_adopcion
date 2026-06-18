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
      const response = await axiosInstance.get('/api/animales');
      setAnimales(response.data);
    } catch (error) {
      console.error('Error fetching animales:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Catálogo de Mascotas</h2>
        {loading ? (
          <p className="text-center text-gray-600">Cargando mascotas...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {animales.map((animal) => (
              <div key={animal.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{animal.nombre}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold text-gray-700">Especie:</span> {animal.especie}</p>
                    <p><span className="font-semibold text-gray-700">Raza:</span> {animal.raza}</p>
                    <p><span className="font-semibold text-gray-700">Tamaño:</span> {animal.tamanio}</p>
                    <p><span className="font-semibold text-gray-700">Salud:</span> {animal.estadoSalud}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-blue-600">
                      📍 {animal.refugio?.nombre || 'Sin refugio'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {animales.length === 0 && (
              <p className="col-span-full text-center text-gray-500">No hay mascotas disponibles en este momento.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoMascotas;
