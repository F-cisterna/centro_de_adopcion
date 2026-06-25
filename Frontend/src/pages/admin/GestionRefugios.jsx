import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import NavBar from '../../components/NavBar';

const GestionRefugios = () => {
  const [refugios, setRefugios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nombre: '', direccion: '', telefono: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRefugios();
  }, []);

  const fetchRefugios = async () => {
    try {
      const response = await axiosInstance.get('/api/refugios');
      setRefugios(response.data);
    } catch (error) {
      console.error('Error fetching refugios:', error);
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
        await axiosInstance.put(`/api/refugios/${editingId}`, form);
      } else {
        await axiosInstance.post('/api/refugios', form);
      }
      setForm({ nombre: '', direccion: '', telefono: '' });
      setEditingId(null);
      fetchRefugios();
    } catch (error) {
      console.error('Error saving refugio:', error);
    }
  };

  const handleEdit = (refugio) => {
    setForm({ nombre: refugio.nombre, direccion: refugio.direccion, telefono: refugio.telefono });
    setEditingId(refugio.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este refugio?')) {
      try {
        await axiosInstance.delete(`/api/refugios/${id}`);
        fetchRefugios();
      } catch (error) {
        console.error('Error deleting refugio:', error);
      }
    }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#FFF8F5'}}>
      <NavBar />

      <div style={{backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '32px 24px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h1 style={{fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 6px 0'}}>Gestión de Refugios</h1>
          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: 0}}>Administra los refugios registrados en el sistema</p>
        </div>
      </div>

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>


        <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '28px'}}>
          <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 20px 0'}}>
            {editingId ? 'Editar Refugio' : 'Nuevo Refugio'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px'}}>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Refugio Esperanza"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}
                />
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                  placeholder="Av. Central 123"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}
                />
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  placeholder="+56912345678"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}
                />
              </div>
            </div>
            <div style={{display: 'flex', gap: '12px'}}>
              <button
                type="submit"
                style={{padding: '12px 28px', backgroundColor: '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
              >
                {editingId ? 'Guardar Cambios' : 'Crear Refugio'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setForm({ nombre: '', direccion: '', telefono: '' }); }}
                  style={{padding: '12px 28px', backgroundColor: '#F5F5F5', color: '#666666', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>


        <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', overflow: 'hidden'}}>
          <div style={{padding: '20px 28px', borderBottom: '1px solid #F5F5F5'}}>
            <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0}}>Refugios Registrados</h2>
          </div>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#FAFAFA'}}>
                  <th style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left', padding: '14px 28px'}}>ID</th>
                  <th style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left', padding: '14px 20px'}}>Nombre</th>
                  <th style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left', padding: '14px 20px'}}>Dirección</th>
                  <th style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'left', padding: '14px 20px'}}>Teléfono</th>
                  <th style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'right', padding: '14px 28px'}}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" style={{padding: '16px', textAlign: 'center'}}>Cargando...</td></tr>
                ) : refugios.map((refugio, index) => (
                  <tr key={refugio.id} style={{borderTop: '1px solid #F5F5F5', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FDFDFB'}}>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#AAAAAA', padding: '16px 28px'}}>{refugio.id}</td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', padding: '16px 20px'}}>{refugio.nombre}</td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{refugio.direccion}</td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{refugio.telefono}</td>
                    <td style={{padding: '16px 28px', textAlign: 'right'}}>
                      <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
                        <button
                          onClick={() => handleEdit(refugio)}
                          style={{padding: '8px 16px', backgroundColor: '#FFF0EC', color: '#E8603C', border: 'none', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(refugio.id)}
                          style={{padding: '8px 16px', backgroundColor: '#FFF0F0', color: '#DC2626', border: 'none', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}
                        >
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

export default GestionRefugios;
