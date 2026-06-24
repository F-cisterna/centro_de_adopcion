import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

const CatalogoMascotas = () => {
  const { user } = useAuth();
  const [animales, setAnimales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAnimal, setModalAnimal] = useState(null);
  const [adoptandoId, setAdoptandoId] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

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

  const handleAdoptar = async () => {
    if (!modalAnimal) return;
    setAdoptandoId(modalAnimal.id);
    setMensajeExito('');
    setMensajeError('');
    try {
      const resAdoptantes = await axiosInstance.get('/api/adoptantes');
      const adoptante = resAdoptantes.data.find(a => a.rut === user.username);
      if (!adoptante) {
        setMensajeError('No se encontró tu perfil de adoptante. Contacta al administrador.');
        setAdoptandoId(null);
        return;
      }
      const payload = {
        animalId: modalAnimal.id,
        adoptanteId: adoptante.id,
        fechaSolicitud: new Date().toISOString().split('T')[0],
        estado: 'PENDIENTE',
        observaciones: ''
      };
      await axiosInstance.post('/api/solicitudes', payload);
      setMensajeExito(`¡Solicitud enviada! Pronto revisaremos tu solicitud para adoptar a ${modalAnimal.nombre}.`);
      setModalAnimal(null);
    } catch (error) {
      setMensajeError('Hubo un error al enviar la solicitud. Inténtalo de nuevo.');
      console.error(error);
    } finally {
      setAdoptandoId(null);
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

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>

        {mensajeExito && (
          <div style={{backgroundColor: '#F0FFF4', border: '1px solid #BBF7D0', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{fontSize: '20px'}}>✅</span>
            <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#16A34A', margin: 0, fontWeight: '500'}}>{mensajeExito}</p>
          </div>
        )}
        {mensajeError && (
          <div style={{backgroundColor: '#FFF0F0', border: '1px solid #FECACA', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <span style={{fontSize: '20px'}}>⚠️</span>
            <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#DC2626', margin: 0, fontWeight: '500'}}>{mensajeError}</p>
          </div>
        )}

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

                  {user?.role === 'ROLE_USER' && (
                    <button
                      onClick={() => { setMensajeExito(''); setMensajeError(''); setModalAnimal(animal); }}
                      style={{marginTop: '12px', width: '100%', padding: '12px', backgroundColor: '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
                    >
                      🐾 Quiero adoptarlo
                    </button>
                  )}
                </div>

              </div>
            ))}
            {animales.length === 0 && (
              <p style={{gridColumn: '1 / -1', textAlign: 'center', color: '#999999', fontSize: '14px', padding: '64px 0', fontFamily: 'Inter, sans-serif'}}>No hay mascotas disponibles en este momento.</p>
            )}
          </div>
        )}
      </div>

      {modalAnimal && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '24px'}}>
          <div style={{backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '36px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)'}}>
            <div style={{textAlign: 'center', marginBottom: '24px'}}>
              <div style={{width: '64px', height: '64px', backgroundColor: '#FFF0EC', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'}}>
                <span style={{fontSize: '32px'}}>🐾</span>
              </div>
              <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 8px 0'}}>¿Deseas adoptar a {modalAnimal.nombre}?</h2>
              <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: 0}}>Se enviará una solicitud al centro de adopción. Te notificaremos cuando sea revisada.</p>
            </div>
            <div style={{backgroundColor: '#F9F9F9', borderRadius: '14px', padding: '16px', marginBottom: '24px'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
                <div>
                  <p style={{fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px 0', fontWeight: '600'}}>Especie</p>
                  <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', margin: 0, fontWeight: '500', textTransform: 'capitalize'}}>{modalAnimal.especie}</p>
                </div>
                <div>
                  <p style={{fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px 0', fontWeight: '600'}}>Raza</p>
                  <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', margin: 0, fontWeight: '500', textTransform: 'capitalize'}}>{modalAnimal.raza}</p>
                </div>
                <div>
                  <p style={{fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px 0', fontWeight: '600'}}>Tamaño</p>
                  <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', margin: 0, fontWeight: '500', textTransform: 'capitalize'}}>{modalAnimal.tamanio}</p>
                </div>
                <div>
                  <p style={{fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#AAAAAA', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px 0', fontWeight: '600'}}>Salud</p>
                  <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', margin: 0, fontWeight: '500', textTransform: 'capitalize'}}>{modalAnimal.estadoSalud}</p>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '12px'}}>
              <button
                onClick={() => setModalAnimal(null)}
                style={{flex: 1, padding: '14px', backgroundColor: '#F5F5F5', color: '#666666', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
              >
                Cancelar
              </button>
              <button
                onClick={handleAdoptar}
                disabled={adoptandoId === modalAnimal.id}
                style={{flex: 1, padding: '14px', backgroundColor: adoptandoId === modalAnimal.id ? '#F0A090' : '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: adoptandoId === modalAnimal.id ? 'not-allowed' : 'pointer'}}
              >
                {adoptandoId === modalAnimal.id ? 'Enviando...' : 'Confirmar adopción'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CatalogoMascotas;
