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

  const getStatusBadge = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'aprobada': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Aprobada</span>;
      case 'rechazada': return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">Rechazada</span>;
      default: return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">Pendiente</span>;
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50"><NavBar /><div className="p-8 text-center">Cargando solicitudes...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{user?.role === 'ROLE_ADMIN' ? 'Gestión de Solicitudes' : 'Mis Solicitudes'}</h2>

        {user?.role === 'ROLE_ADMIN' && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">{editingId ? 'Editar Solicitud' : 'Nueva Solicitud'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Animal</label>
                    <select name="animalId" value={form.animalId} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option value="">Seleccione un animal</option>
                      {animales.map(a => <option key={a.id} value={a.id}>{a.nombre} ({a.especie})</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Adoptante</label>
                    <select name="adoptanteId" value={form.adoptanteId} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option value="">Seleccione un adoptante</option>
                      {adoptantes.map(a => <option key={a.id} value={a.id}>{a.nombreCompleto} - {a.rut}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select name="estado" value={form.estado} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2 bg-white">
                      <option value="Pendiente">Pendiente</option>
                      <option value="Aprobada">Aprobada</option>
                      <option value="Rechazada">Rechazada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha Solicitud</label>
                    <input type="date" name="fechaSolicitud" value={form.fechaSolicitud} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                    <input type="text" name="observaciones" value={form.observaciones} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setForm({ fechaSolicitud: new Date().toISOString().split('T')[0], estado: 'Pendiente', observaciones: '', animalId: '', adoptanteId: '' }); }} className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600 transition-colors">Cancelar</button>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Animal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adoptante</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {solicitudes.map((s) => (
                    <tr key={s.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.fechaSolicitud}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{s.animal?.nombre} ({s.animal?.raza})</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.adoptante?.nombreCompleto}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(s.estado)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-900">Editar</button>
                        <select onChange={(e) => handleStateChange(s.id, e.target.value)} value={s.estado} className="ml-2 border border-gray-300 rounded text-xs p-1">
                          <option value="Pendiente">Pendiente</option>
                          <option value="Aprobada">Aprobar</option>
                          <option value="Rechazada">Rechazar</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {user?.role === 'ROLE_USER' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solicitudes.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">No tienes solicitudes registradas.</p>
            ) : (
              solicitudes.map((s) => (
                <div key={s.id} className="bg-white rounded-xl shadow-md overflow-hidden p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{s.animal?.nombre}</h3>
                    {getStatusBadge(s.estado)}
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold text-gray-700">Raza:</span> {s.animal?.raza}</p>
                    <p><span className="font-semibold text-gray-700">Fecha de Solicitud:</span> {s.fechaSolicitud}</p>
                    {s.observaciones && <p><span className="font-semibold text-gray-700">Notas:</span> {s.observaciones}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GestionSolicitudes;
