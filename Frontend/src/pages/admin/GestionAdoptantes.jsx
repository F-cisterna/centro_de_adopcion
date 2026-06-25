import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import NavBar from '../../components/NavBar';

const GestionAdoptantes = () => {
  const [adoptantes, setAdoptantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombreCompleto: '', rut: '', email: '', telefono: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAdoptantes();
  }, []);

  const fetchAdoptantes = async () => {
    try {
      const response = await axiosInstance.get('/api/adoptantes');
      setAdoptantes(response.data);
    } catch (error) {
      console.error('Error fetching adoptantes:', error);
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
      if (editingId) {
        await axiosInstance.put(`/api/adoptantes/${editingId}`, form);
      } else {
        await axiosInstance.post('/api/adoptantes', form);
      }
      setForm({ nombreCompleto: '', rut: '', email: '', telefono: '' });
      setEditingId(null);
      fetchAdoptantes();
    } catch (error) {
      console.error('Error saving adoptante:', error);
    }
  };

  const handleEdit = (adoptante) => {
    setForm({
      nombreCompleto: adoptante.nombreCompleto,
      rut: adoptante.rut,
      email: adoptante.email,
      telefono: adoptante.telefono
    });
    setEditingId(adoptante.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este adoptante?')) {
      try {
        await axiosInstance.delete(`/api/adoptantes/${id}`);
        fetchAdoptantes();
      } catch (error) {
        console.error('Error deleting adoptante:', error);
      }
    }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#FFF8F5'}}>
      <NavBar />

      <div style={{backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '32px 24px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h1 style={{fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 6px 0'}}>Gestión de Adoptantes</h1>
          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: 0}}>Administra los adoptantes registrados en el sistema</p>
        </div>
      </div>

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>


        <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '28px'}}>
          <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 20px 0'}}>
            {editingId ? 'Editar Adoptante' : 'Nuevo Adoptante'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px'}}>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Nombre Completo</label>
                <input type="text" name="nombreCompleto" value={form.nombreCompleto} onChange={handleChange} required placeholder="Juan Pérez"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>RUT</label>
                <input type="text" name="rut" value={form.rut} onChange={handleChange} required placeholder="12.345.678-9"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="juan@correo.com"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Teléfono</label>
                <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required placeholder="+56912345678"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
            </div>
            <div style={{display: 'flex', gap: '12px'}}>
              <button
                type="submit"
                style={{padding: '12px 28px', backgroundColor: '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}>
                {editingId ? 'Guardar Cambios' : 'Crear Adoptante'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setForm({ nombreCompleto: '', rut: '', email: '', telefono: '' }); }}
                  style={{padding: '12px 28px', backgroundColor: '#F5F5F5', color: '#666666', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>


        <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', overflow: 'hidden'}}>
          <div style={{padding: '20px 28px', borderBottom: '1px solid #F5F5F5'}}>
            <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0}}>Adoptantes Registrados</h2>
          </div>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#FAFAFA'}}>
                  {['Nombre', 'RUT', 'Email', 'Teléfono', 'Acciones'].map((col, i) => (
                    <th key={i} style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: i === 4 ? 'right' : 'left', padding: i === 0 ? '14px 28px' : i === 4 ? '14px 28px' : '14px 20px'}}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{padding: '16px', textAlign: 'center'}}>Cargando...</td></tr>
                ) : adoptantes.map((adoptante, index) => (
                  <tr key={adoptante.id} style={{borderTop: '1px solid #F5F5F5', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FDFDFB'}}>
                    <td style={{padding: '16px 28px'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                        <div style={{width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#FFF0EC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                          <span style={{fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: '700', color: '#E8603C'}}>
                            {adoptante.nombreCompleto?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600', color: '#1A1A1A'}}>{adoptante.nombreCompleto}</span>
                      </div>
                    </td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{adoptante.rut}</td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{adoptante.email}</td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{adoptante.telefono}</td>
                    <td style={{padding: '16px 28px', textAlign: 'right'}}>
                      <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
                        <button onClick={() => handleEdit(adoptante)}
                          style={{padding: '8px 16px', backgroundColor: '#FFF0EC', color: '#E8603C', border: 'none', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
                          Editar
                        </button>
                        <button onClick={() => handleDelete(adoptante.id)}
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

export default GestionAdoptantes;
