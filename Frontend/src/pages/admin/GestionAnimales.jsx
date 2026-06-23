import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import NavBar from '../../components/NavBar';

const GestionAnimales = () => {
  const [animales, setAnimales] = useState([]);
  const [refugios, setRefugios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nombre: '', especie: '', raza: '', edadEstimada: '', tamanio: '', estadoSalud: '', refugioId: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resAnimales, resRefugios] = await Promise.all([
        axiosInstance.get('/api/animales'),
        axiosInstance.get('/api/refugios')
      ]);
      setAnimales(resAnimales.data);
      setRefugios(resRefugios.data);
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
      const payload = { ...form, edadEstimada: parseInt(form.edadEstimada), refugioId: parseInt(form.refugioId) };
      if (editingId) {
        await axiosInstance.put(`/api/animales/${editingId}`, payload);
      } else {
        await axiosInstance.post('/api/animales', payload);
      }
      setForm({ nombre: '', especie: '', raza: '', edadEstimada: '', tamanio: '', estadoSalud: '', refugioId: '' });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error saving animal:', error);
    }
  };

  const handleEdit = (animal) => {
    setForm({
      nombre: animal.nombre,
      especie: animal.especie,
      raza: animal.raza,
      edadEstimada: animal.edadEstimada,
      tamanio: animal.tamanio,
      estadoSalud: animal.estadoSalud,
      refugioId: animal.refugio?.id || ''
    });
    setEditingId(animal.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este animal?')) {
      try {
        await axiosInstance.delete(`/api/animales/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting animal:', error);
      }
    }
  };

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#FFF8F5'}}>
      <NavBar />

      <div style={{backgroundColor: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '32px 24px'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto'}}>
          <h1 style={{fontFamily: 'Poppins, sans-serif', fontSize: '28px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 6px 0'}}>Gestión de Animales</h1>
          <p style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#AAAAAA', margin: 0}}>Administra los animales registrados en el sistema</p>
        </div>
      </div>

      <div style={{maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '24px'}}>

        {/* FORMULARIO CREAR / EDITAR */}
        <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', padding: '28px'}}>
          <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 20px 0'}}>
            {editingId ? 'Editar Animal' : 'Nuevo Animal'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px'}}>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Bobby"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Especie</label>
                <input type="text" name="especie" value={form.especie} onChange={handleChange} required placeholder="Perro"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Raza</label>
                <input type="text" name="raza" value={form.raza} onChange={handleChange} required placeholder="Poodle"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Edad Estimada (años)</label>
                <input type="number" name="edadEstimada" min="0" max="30" value={form.edadEstimada} onChange={(e) => setForm({...form, edadEstimada: Math.max(0, Number(e.target.value))})} required placeholder="3"
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none'}}/>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Tamaño</label>
                <select name="tamanio" value={form.tamanio} onChange={handleChange} required
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none', appearance: 'none'}}>
                  <option value="">Seleccionar...</option>
                  <option value="PEQUEÑO">Pequeño</option>
                  <option value="MEDIANO">Mediano</option>
                  <option value="GRANDE">Grande</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Estado de Salud</label>
                <select name="estadoSalud" value={form.estadoSalud} onChange={handleChange} required
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none', appearance: 'none'}}>
                  <option value="">Seleccionar...</option>
                  <option value="SANO">Sano</option>
                  <option value="EN_TRATAMIENTO">En tratamiento</option>
                  <option value="RECUPERADO">Recuperado</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#999999', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px'}}>Refugio</label>
                <select name="refugioId" value={form.refugioId} onChange={handleChange} required
                  style={{width: '100%', boxSizing: 'border-box', padding: '12px 16px', backgroundColor: '#F9F9F9', border: '1.5px solid #EEEEEE', borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A1A1A', outline: 'none', appearance: 'none'}}>
                  <option value="">Seleccione un refugio</option>
                  {refugios.map((r) => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{display: 'flex', gap: '12px'}}>
              <button
                type="submit"
                style={{padding: '12px 28px', backgroundColor: '#E8603C', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
              >
                {editingId ? 'Guardar Cambios' : 'Crear Animal'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setForm({ nombre: '', especie: '', raza: '', edadEstimada: '', tamanio: '', estadoSalud: '', refugioId: '' }); }}
                  style={{padding: '12px 28px', backgroundColor: '#F5F5F5', color: '#666666', border: 'none', borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', fontWeight: '600', cursor: 'pointer'}}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TABLA DE ANIMALES */}
        <div style={{backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #F0F0F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', overflow: 'hidden'}}>
          <div style={{padding: '20px 28px', borderBottom: '1px solid #F5F5F5'}}>
            <h2 style={{fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: '700', color: '#1A1A1A', margin: 0}}>Animales Registrados</h2>
          </div>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{backgroundColor: '#FAFAFA'}}>
                  {['Nombre', 'Especie / Raza', 'Edad / Tamaño', 'Salud', 'Refugio', 'Acciones'].map((col, i) => (
                    <th key={i} style={{fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: '600', color: '#AAAAAA', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: i === 5 ? 'right' : 'left', padding: i === 0 ? '14px 28px' : i === 5 ? '14px 28px' : '14px 20px'}}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" style={{padding: '16px', textAlign: 'center'}}>Cargando...</td></tr>
                ) : animales.map((animal, index) => (
                  <tr key={animal.id} style={{borderTop: '1px solid #F5F5F5', backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FDFDFB'}}>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', padding: '16px 28px'}}>{animal.nombre}</td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{animal.especie} · {animal.raza}</td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{animal.edadEstimada} años · {animal.tamanio}</td>
                    <td style={{padding: '16px 20px'}}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: '600',
                        backgroundColor: animal.estadoSalud?.toUpperCase() === 'SANO' ? '#F0FFF4' : animal.estadoSalud?.toUpperCase() === 'EN_TRATAMIENTO' ? '#FFF8EC' : '#F0FFF4',
                        color: animal.estadoSalud?.toUpperCase() === 'SANO' ? '#16A34A' : animal.estadoSalud?.toUpperCase() === 'EN_TRATAMIENTO' ? '#D97706' : '#16A34A'
                      }}>
                        {animal.estadoSalud?.toUpperCase() === 'SANO' ? 'Sano' : animal.estadoSalud?.toUpperCase() === 'EN_TRATAMIENTO' ? 'En tratamiento' : animal.estadoSalud}
                      </span>
                    </td>
                    <td style={{fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#666666', padding: '16px 20px'}}>{animal.refugio?.nombre || '—'}</td>
                    <td style={{padding: '16px 28px', textAlign: 'right'}}>
                      <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-end'}}>
                        <button onClick={() => handleEdit(animal)}
                          style={{padding: '8px 16px', backgroundColor: '#FFF0EC', color: '#E8603C', border: 'none', borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
                          Editar
                        </button>
                        <button onClick={() => handleDelete(animal.id)}
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

export default GestionAnimales;
