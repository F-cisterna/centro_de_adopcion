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
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Seguimientos</h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Editar Seguimiento' : 'Nuevo Seguimiento'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Solicitud Aprobada</label>
                <select name="solicitudAdopcionId" value={form.solicitudAdopcionId} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                  <option value="">Seleccione solicitud</option>
                  {solicitudes.map(s => (
                    <option key={s.id} value={s.id}>ID: {s.id} - {s.animal?.nombre} / {s.adoptante?.nombreCompleto}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Visita</label>
                <input type="date" name="fechaVisita" value={form.fechaVisita} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado del Animal</label>
                <input type="text" name="estadoAnimal" value={form.estadoAnimal} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                <input type="text" name="observaciones" value={form.observaciones} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ fechaVisita: new Date().toISOString().split('T')[0], observaciones: '', estadoAnimal: '', solicitudAdopcionId: '' }); }} className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition-colors">Cancelar</button>
              )}
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors">
                {editingId ? 'Actualizar' : 'Registrar'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Visita</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal / Adoptante</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado Animal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observaciones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-4 text-center">Cargando...</td></tr>
              ) : seguimientos.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.fechaVisita}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.solicitud?.animal?.nombre} / {s.solicitud?.adoptante?.nombreCompleto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.estadoAnimal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.observaciones}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-900">Editar</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionSeguimientos;
