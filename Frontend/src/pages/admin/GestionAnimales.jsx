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
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Gestión de Animales</h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">{editingId ? 'Editar Animal' : 'Nuevo Animal'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Especie</label>
                <input type="text" name="especie" value={form.especie} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Raza</label>
                <input type="text" name="raza" value={form.raza} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Edad Estimada (años)</label>
                <input type="number" name="edadEstimada" value={form.edadEstimada} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tamaño</label>
                <input type="text" name="tamanio" value={form.tamanio} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado de Salud</label>
                <input type="text" name="estadoSalud" value={form.estadoSalud} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Refugio</label>
                <select name="refugioId" value={form.refugioId} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                  <option value="">Seleccione un refugio</option>
                  {refugios.map(r => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm({ nombre: '', especie: '', raza: '', edadEstimada: '', tamanio: '', estadoSalud: '', refugioId: '' }); }} className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition-colors">Cancelar</button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especie/Raza</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad/Tamaño</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salud</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refugio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-4 text-center">Cargando...</td></tr>
              ) : animales.map((a) => (
                <tr key={a.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{a.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.especie} - {a.raza}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.edadEstimada} años - {a.tamanio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.estadoSalud}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.refugio?.nombre}</td>
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

export default GestionAnimales;
