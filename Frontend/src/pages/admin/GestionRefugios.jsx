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
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Refugios</h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Editar Refugio' : 'Nuevo Refugio'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección</label>
                <input type="text" name="direccion" value={form.direccion} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ nombre: '', direccion: '', telefono: '' }); }} className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition-colors">Cancelar</button>
              )}
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-4 text-center">Cargando...</td></tr>
              ) : refugios.map((r) => (
                <tr key={r.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.direccion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{r.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-900">Editar</button>
                    <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
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

export default GestionRefugios;
