import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import ProtectedRoute from './components/ProtectedRoute'
import CategoriaPage from './pages/CategoriaPage'
import CatalogoMascotas from './pages/CatalogoMascotas'
import GestionRefugios from './pages/admin/GestionRefugios'
import GestionAnimales from './pages/admin/GestionAnimales'
import GestionAdoptantes from './pages/admin/GestionAdoptantes'
import GestionSeguimientos from './pages/admin/GestionSeguimientos'
import GestionSolicitudes from './pages/GestionSolicitudes'
import { useAuth } from './context/AuthContext'

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'ROLE_ADMIN') {
    return <Navigate to="/admin/refugios" replace />;
  }
  if (user?.role === 'ROLE_USER') {
    return <Navigate to="/catalogo" replace />;
  }
  return <Navigate to="/login" replace />;
};

function App() {
  const route = createBrowserRouter([
    {path:'/', element:<Navigate to="/login" replace />},
    {path:'/login', element:<LoginPage />},
    {path:'/dashboard', element:<ProtectedRoute allowedRoles={["ROLE_ADMIN","ROLE_USER"]}><DashboardRedirect/></ProtectedRoute>},
    {path:'/catalogo', element:<ProtectedRoute allowedRoles={["ROLE_USER"]}><CatalogoMascotas/></ProtectedRoute>},
    {path:'/admin/refugios', element:<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><GestionRefugios/></ProtectedRoute>},
    {path:'/admin/animales', element:<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><GestionAnimales/></ProtectedRoute>},
    {path:'/admin/adoptantes', element:<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><GestionAdoptantes/></ProtectedRoute>},
    {path:'/admin/seguimientos', element:<ProtectedRoute allowedRoles={["ROLE_ADMIN"]}><GestionSeguimientos/></ProtectedRoute>},
    {path:'/solicitudes', element:<ProtectedRoute allowedRoles={["ROLE_ADMIN","ROLE_USER"]}><GestionSolicitudes/></ProtectedRoute>},
    {path:'/categoria', element:<ProtectedRoute allowedRoles={["ROLE_ADMIN","ROLE_USER"]}><CategoriaPage/></ProtectedRoute>},
    {path:'/no-autorizado', element:<h3>No tienes permisos para acceder a esta página</h3>}
  ])

  return <RouterProvider router={route} />
}

export default App
