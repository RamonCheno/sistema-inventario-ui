import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CategoriasPage from './pages/CategoriasPage';
import ProveedoresPage from './pages/ProveedorPage';
import ProductosPage from './pages/ProductosPage';
import ClientesPage from './pages/ClientesPage';
import VentasPage from './pages/VentasPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/categorias" replace />} />
        <Route path="categorias" element={<CategoriasPage />} />
        <Route path="proveedores" element={<ProveedoresPage />} />
        <Route path="productos" element={<ProductosPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="ventas" element={<VentasPage />} />
      </Route>
    </Routes>
  );
}
