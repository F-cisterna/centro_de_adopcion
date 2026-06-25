import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';

const GestionSolicitudes = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [animales, setAnimales] = useState([]);
  const [adoptantes, setAdoptantes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({
    fechaSolicitud: new Date().toISOString().split('T')[0],
    estado: 'Pendiente',
    observaciones: '',
    animalId: '',
    adoptanteId: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      if (user?.role === 'ROLE_ADMIN') {
        const [resSol, resAni, resAdo] = await Promise.all([
          axiosInstance.get('/api/solicitudes'),
          axiosInstance.get('/api/animales'),
          axiosInstance.get('/api/adoptantes')
        ]);
        setSolicitudes(resSol.data);
        setAnimales(resAni.data);
        setAdoptantes(resAdo.data);
      } else if (user?.role === 'ROLE_USER') {
        
        const response = await axiosInstance.get('/api/solicitudes');
        
        const misSolicitudes = response.data.filter(
          s => s.adoptante?.rut === user.username
        );
        
        setSolicitudes(misSolicitudes);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        animalId: parseInt(form.animalId),
        adoptanteId: parseInt(form.adoptanteId)
      };
      if (editingId) {
        await axiosInstance.put(`/api/solicitudes/${editingId}`, payload);
      } else {
        await axiosInstance.post('/api/solicitudes', payload);
      }
      setForm({
        fechaSolicitud: new Date().toISOString().split('T')[0],
        estado: 'Pendiente',
        observaciones: '',
        animalId: '',
        adoptanteId: ''
      });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error saving solicitud:', error);
    }
  };

  const handleEdit = (solicitud) => {
    setForm({
      fechaSolicitud: solicitud.fechaSolicitud,
      estado: solicitud.estado,
      observaciones: solicitud.observaciones || '',
      animalId: solicitud.animal?.id || '',
      adoptanteId: solicitud.adoptante?.id || ''
    });
    setEditingId(solicitud.id);
  };

  const handleStateChange = async (id, newState) => {
    const solicitud = solicitudes.find(s => s.id === id);
    if (!solicitud) return;
    try {
      const payload = {
        fechaSolicitud: solicitud.fechaSolicitud,
        estado: newState,
        observaciones: solicitud.observaciones,
        animalId: solicitud.animal?.id,
        adoptanteId: solicitud.adoptante?.id
      };
      await axiosInstance.put(`/api/solicitudes/${id}`, payload);
      fetchData();
    } catch (error) {
      console.error('Error changing state:', error);
    }
  };

  if (loading) return (
    <div style={{minHeight: '100vh', backgroundColor: '#FFF8F5'}}>
      <NavBar />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA'}}>
        Cargando solicitudes...
      </div>
    </div>
  );

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#FFF8F5'}}>
      <NavBar />

      <div style={{backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '32px 24px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h1 style={{fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 6px 0'}}>
            {user?.role === 'ROLE_ADMIN' ? 'Gestión de Solicitudes' : 'Mis Solicitudes'}
          </h1>
          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: 0}}>
            {user?.role === 'ROLE_ADMIN' ? 'Administra y evalúa las solicitudes de adopción' : 'Revisa el estado de tus solicitudes de adopción 🐾'}
          </p>
        </div>
      </div>

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>

        {user?.role === 'ROLE_ADMIN' && (
          <>

            <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '28px'}}>
              <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 20px 0'}}>
                {editingId ? 'Editar Solicitud' : 'Nueva Solicitud'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px'}}>
                  <div>
                    <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Animal</label>
                    <select name="animalId" value={form.animalId} onChange={handleChange}
                      style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none', appearance: 'none'}}>
                      <option value="">Seleccione un animal</option>
                      {animales.map((a) => (
                        <option key={a.id} value={a.id}>{a.nombre} ({a.raza})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Adoptante</label>
                    <select name="adoptanteId" value={form.adoptanteId} onChange={handleChange}
                      style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none', appearance: 'none'}}>
                      <option value="">Seleccione un adoptante</option>
                      {adoptantes.map((ad) => (
                        <option key={ad.id} value={ad.id}>{ad.nombreCompleto}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Estado</label>
                    <select name="estado" value={form.estado} onChange={handleChange}
                      style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none', appearance: 'none'}}>
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="APROBADA">Aprobada</option>
                      <option value="RECHAZADA">Rechazada</option>
                    </select>
                  </div>
                  <div>
                    <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Fecha Solicitud</label>
                    <input type="date" name="fechaSolicitud" value={form.fechaSolicitud} onChange={handleChange}
                      style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
                  </div>
                  <div style={{gridColumn: 'span 2'}}>
                    <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Observaciones</label>
                    <input type="text" name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Observaciones opcionales..."
                      style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '12px'}}>
                  <button type="submit"
                    style={{padding: '12px 28px', backgroundColor: '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}>
                    {editingId ? 'Guardar Cambios' : 'Crear Solicitud'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setForm({ fechaSolicitud: new Date().toISOString().split('T')[0], estado: 'Pendiente', observaciones: '', animalId: '', adoptanteId: '' }); }}
                      style={{padding: '12px 28px', backgroundColor: '#F5F5F5', color: '#666666', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>


            <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', overflow: 'hidden'}}>
              <div style={{padding: '20px 28px', borderBottom: '1px solid #F5F5F5'}}>
                <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0}}>Solicitudes Registradas</h2>
              </div>
              <div style={{overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{backgroundColor: '#FAFAFA'}}>
                      {['Fecha', 'Animal', 'Adoptante', 'Estado', 'Acciones'].map((col, i) => (
                        <th key={i} style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: i === 4 ? 'right' : 'left', padding: i === 0 ? '14px 28px' : i === 4 ? '14px 28px' : '14px 20px'}}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {solicitudes.map((solicitud, index) => (
                      <tr key={solicitud.id} style={{borderTop: '1px solid #F5F5F5', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FDFDFB'}}>
                        <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 28px'}}>
                          {new Date(solicitud.fechaSolicitud).toLocaleDateString('es-CL')}
                        </td>
                        <td style={{padding: '16px 20px'}}>
                          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', margin: '0 0 2px 0'}}>{solicitud.animal?.nombre}</p>
                          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#AAAAAA', margin: 0}}>{solicitud.animal?.raza}</p>
                        </td>
                        <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{solicitud.adoptante?.nombreCompleto}</td>
                        <td style={{padding: '16px 20px'}}>
                          <span style={{
                            padding: '4px 12px', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: '600',
                            backgroundColor: solicitud.estado?.toUpperCase() === 'APROBADA' ? '#F0FFF4' : solicitud.estado?.toUpperCase() === 'RECHAZADA' ? '#FFF0F0' : '#FFF8EC',
                            color: solicitud.estado?.toUpperCase() === 'APROBADA' ? '#16A34A' : solicitud.estado?.toUpperCase() === 'RECHAZADA' ? '#DC2626' : '#D97706'
                          }}>
                            {solicitud.estado}
                          </span>
                        </td>
                        <td style={{padding: '16px 28px', textAlign: 'right'}}>
                          <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <button onClick={() => handleEdit(solicitud)}
                              style={{padding: '8px 16px', backgroundColor: '#FFF0EC', color: '#E8603C', border: 'none', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
                              Editar
                            </button>
                            <select
                              value={solicitud.estado}
                              onChange={(e) => handleStateChange(solicitud.id, e.target.value)}
                              style={{padding: '8px 12px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#666666', outline: 'none', cursor: 'pointer'}}>
                              <option value="PENDIENTE">Pendiente</option>
                              <option value="APROBADA">Aprobar</option>
                              <option value="RECHAZADA">Rechazar</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {user?.role === 'ROLE_USER' && (
          <>

            {solicitudes.length === 0 && (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0'}}>
                <span style={{fontSize: '64px', marginBottom: '16px', opacity: 0.4}}>🐾</span>
                <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 8px 0'}}>Aún no tienes solicitudes</h2>
                <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: '0 0 24px 0', textAlign: 'center'}}>Visita el catálogo y encuentra a tu compañero perfecto</p>
                <a href="/catalogo" style={{padding: '12px 28px', backgroundColor: '#E8603C', color: '#FFFFFF', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', textDecoration: 'none'}}>Ver Catálogo</a>
              </div>
            )}


            {solicitudes.length > 0 && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {solicitudes.map((solicitud) => (
                  <div key={solicitud.id} style={{backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #F0F0F0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px'}}>

                    <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                      <div style={{width: '48px', height: '48px', backgroundColor: '#FFF0EC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                        <span style={{fontSize: '24px'}}>🐾</span>
                      </div>
                      <div>
                        <p style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 4px 0'}}>{solicitud.animal?.nombre || 'Animal'}</p>
                        <p style={{fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#AAAAAA', margin: 0}}>Solicitud #{solicitud.id} · {new Date(solicitud.fechaSolicitud).toLocaleDateString('es-CL')}</p>
                      </div>
                    </div>

                    <div style={{display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0}}>
                      {solicitud.observaciones && (
                        <p style={{fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#888888', margin: 0, maxWidth: '200px'}}>{solicitud.observaciones}</p>
                      )}
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: solicitud.estado?.toUpperCase() === 'APROBADA' ? '#F0FFF4' : solicitud.estado?.toUpperCase() === 'RECHAZADA' ? '#FFF0F0' : '#FFF8EC',
                        color: solicitud.estado?.toUpperCase() === 'APROBADA' ? '#16A34A' : solicitud.estado?.toUpperCase() === 'RECHAZADA' ? '#DC2626' : '#D97706'
                      }}>
                        {solicitud.estado}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default GestionSolicitudes;
