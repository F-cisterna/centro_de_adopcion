import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import NavBar from '../../components/NavBar';

const GestionSeguimientos = () => {
  const [seguimientos, setSeguimientos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fechaVisita: new Date().toISOString().split('T')[0],
    observaciones: '',
    estadoAnimal: '',
    solicitudAdopcionId: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resSeg, resSol] = await Promise.all([
        axiosInstance.get('/api/seguimientos'),
        axiosInstance.get('/api/solicitudes')
      ]);
      setSeguimientos(resSeg.data);
      // Solo mostramos las aprobadas en el select de creación, pero traemos todas para la tabla
      setSolicitudes(resSol.data.filter(s => s.estado.toLowerCase() === 'aprobada'));
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
      const payload = { ...form, solicitudAdopcionId: parseInt(form.solicitudAdopcionId) };
      if (editingId) {
        await axiosInstance.put(`/api/seguimientos/${editingId}`, payload);
      } else {
        await axiosInstance.post('/api/seguimientos', payload);
      }
      setForm({ fechaVisita: new Date().toISOString().split('T')[0], observaciones: '', estadoAnimal: '', solicitudAdopcionId: '' });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error saving seguimiento:', error);
    }
  };

  const handleEdit = (seguimiento) => {
    setForm({
      fechaVisita: seguimiento.fechaVisita,
      observaciones: seguimiento.observaciones,
      estadoAnimal: seguimiento.estadoAnimal,
      solicitudAdopcionId: seguimiento.solicitud?.id || ''
    });
    setEditingId(seguimiento.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este seguimiento?')) {
      try {
        await axiosInstance.delete(`/api/seguimientos/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting seguimiento:', error);
      }
    }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#FFF8F5'}}>
      <NavBar />

      <div style={{backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '32px 24px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h1 style={{fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 6px 0'}}>Gestión de Seguimientos</h1>
          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: 0}}>Registra y monitorea el bienestar de los animales adoptados</p>
        </div>
      </div>

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>

        {/* FORMULARIO CREAR / EDITAR */}
        <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '28px'}}>
          <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 20px 0'}}>
            {editingId ? 'Editar Seguimiento' : 'Nuevo Seguimiento'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px'}}>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Solicitud Aprobada</label>
                <select name="solicitudAdopcionId" value={form.solicitudAdopcionId} onChange={handleChange}
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none', appearance: 'none'}}>
                  <option value="">Seleccione solicitud</option>
                  {solicitudes.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.animal?.nombre} / {s.adoptante?.nombreCompleto}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Fecha de Visita</label>
                <input type="date" name="fechaVisita" value={form.fechaVisita} onChange={handleChange}
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Estado del Animal</label>
                <input type="text" name="estadoAnimal" value={form.estadoAnimal} onChange={handleChange} placeholder="Ej: Excelente, En recuperación..."
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Observaciones</label>
                <input type="text" name="observaciones" value={form.observaciones} onChange={handleChange} placeholder="Notas de la visita..."
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
            </div>
            <div style={{display: 'flex', gap: '12px'}}>
              <button type="submit"
                style={{padding: '12px 28px', backgroundColor: '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}>
                {editingId ? 'Guardar Cambios' : 'Registrar Seguimiento'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ fechaVisita: new Date().toISOString().split('T')[0], observaciones: '', estadoAnimal: '', solicitudAdopcionId: '' }); }}
                  style={{padding: '12px 28px', backgroundColor: '#F5F5F5', color: '#666666', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TABLA DE SEGUIMIENTOS */}
        <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', overflow: 'hidden'}}>
          <div style={{padding: '20px 28px', borderBottom: '1px solid #F5F5F5'}}>
            <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0}}>Seguimientos Registrados</h2>
          </div>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#FAFAFA'}}>
                  {['Fecha Visita', 'Animal / Adoptante', 'Estado Animal', 'Observaciones', 'Acciones'].map((col, i) => (
                    <th key={i} style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: i === 4 ? 'right' : 'left', padding: i === 0 ? '14px 28px' : i === 4 ? '14px 28px' : '14px 20px'}}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {seguimientos.map((s, index) => (
                  <tr key={s.id} style={{borderTop: '1px solid #F5F5F5', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FDFDFB'}}>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 28px'}}>
                      {new Date(s.fechaVisita).toLocaleDateString('es-CL')}
                    </td>
                    <td style={{padding: '16px 20px'}}>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', margin: '0 0 2px 0'}}>{s.solicitud?.animal?.nombre}</p>
                      <p style={{fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#AAAAAA', margin: 0}}>{s.solicitud?.adoptante?.nombreCompleto}</p>
                    </td>
                    <td style={{padding: '16px 20px'}}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: '600',
                        backgroundColor: s.estadoAnimal?.toUpperCase().includes('EXCELENTE') || s.estadoAnimal?.toUpperCase().includes('CORRECTO') || s.estadoAnimal?.toUpperCase().includes('BIEN') ? '#F0FFF4' : '#FFF8EC',
                        color: s.estadoAnimal?.toUpperCase().includes('EXCELENTE') || s.estadoAnimal?.toUpperCase().includes('CORRECTO') || s.estadoAnimal?.toUpperCase().includes('BIEN') ? '#16A34A' : '#D97706'
                      }}>
                        {s.estadoAnimal}
                      </span>
                    </td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px', maxWidth: '280px'}}>
                      <span style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{s.observaciones}</span>
                    </td>
                    <td style={{padding: '16px 28px', textAlign: 'right'}}>
                      <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
                        <button onClick={() => handleEdit(s)}
                          style={{padding: '8px 16px', backgroundColor: '#FFF0EC', color: '#E8603C', border: 'none', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
                          Editar
                        </button>
                        <button onClick={() => handleDelete(s.id)}
                          style={{padding: '8px 16px', backgroundColor: '#FFF0F0', color: '#DC2626', border: 'none', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GestionSeguimientos;
