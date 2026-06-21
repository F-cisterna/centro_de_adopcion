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
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Adoptantes</h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Editar Adoptante' : 'Nuevo Adoptante'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input type="text" name="nombreCompleto" value={form.nombreCompleto} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">RUT</label>
                <input type="text" name="rut" value={form.rut} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input type="text" name="telefono" value={form.telefono} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ nombreCompleto: '', rut: '', email: '', telefono: '' }); }} className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition-colors">Cancelar</button>
              )}
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RUT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-4 text-center">Cargando...</td></tr>
              ) : adoptantes.map((a) => (
                <tr key={a.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{a.nombreCompleto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.rut}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => handleEdit(a)} className="text-blue-600 hover:text-blue-900">Editar</button>
                    <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
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

export default GestionAdoptantes;
