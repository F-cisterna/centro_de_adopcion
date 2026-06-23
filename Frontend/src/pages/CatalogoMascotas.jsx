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
    <div style={{minHeight: '100vh', backgroundColor: '#FFF8F5'}}>
      <NavBar />

      <div style={{backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '32px 24px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h1 style={{fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 6px 0'}}>Catálogo de Mascotas</h1>
          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: 0}}>Encuentra a tu compañero perfecto 🐾</p>
        </div>
      </div>

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '32px 24px'}}>
        {loading ? (
          <p style={{textAlign: 'center', color: '#999999', fontSize: '14px', padding: '64px 0', fontFamily: 'Inter, sans-serif'}}>Cargando mascotas...</p>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
            {animales.map((animal) => (
              <div key={animal.id} style={{backgroundColor: '#FFFFFF', borderRadius: '20px', overflow: 'hidden', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s ease'}}>

                <div style={{backgroundColor: '#FFF0EC', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{fontSize: '64px', opacity: 0.25}}>🐾</span>
                </div>

                <div style={{padding: '20px'}}>
                  <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 16px 0'}}>{animal.nombre}</h2>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px'}}>
                    <div style={{backgroundColor: '#F9F9F9', borderRadius: '12px', padding: '10px 14px'}}>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: '600', color: '#BBBBBB', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px 0'}}>Especie</p>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', color: '#333333', margin: 0, textTransform: 'capitalize'}}>{animal.especie}</p>
                    </div>
                    <div style={{backgroundColor: '#F9F9F9', borderRadius: '12px', padding: '10px 14px'}}>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: '600', color: '#BBBBBB', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px 0'}}>Raza</p>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', color: '#333333', margin: 0, textTransform: 'capitalize'}}>{animal.raza}</p>
                    </div>
                    <div style={{backgroundColor: '#F9F9F9', borderRadius: '12px', padding: '10px 14px'}}>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: '600', color: '#BBBBBB', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px 0'}}>Tamaño</p>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', color: '#333333', margin: 0, textTransform: 'capitalize'}}>{animal.tamanio}</p>
                    </div>
                    <div style={{backgroundColor: '#F9F9F9', borderRadius: '12px', padding: '10px 14px'}}>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: '600', color: '#BBBBBB', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px 0'}}>Salud</p>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', color: '#333333', margin: 0, textTransform: 'capitalize'}}>{animal.estadoSalud}</p>
                    </div>
                  </div>

                  <div style={{display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#F0FFF4', padding: '6px 14px', borderRadius: '8px'}}>
                    <div style={{width: '6px', height: '6px', backgroundColor: '#22C55E', borderRadius: '50%'}}></div>
                    <span style={{fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: '500', color: '#16A34A'}}>Disponible para adopción</span>
                  </div>
                </div>

              </div>
            ))}
            {animales.length === 0 && (
              <p style={{gridColumn: '1 / -1', textAlign: 'center', color: '#999999', fontSize: '14px', padding: '64px 0', fontFamily: 'Inter, sans-serif'}}>No hay mascotas disponibles en este momento.</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default CatalogoMascotas;
