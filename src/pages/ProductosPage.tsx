import { useEffect, useState } from 'react';
import type { Categoria, Producto, Proveedor } from '../types/inventario';
import { createProducto, deleteProducto, getProductos, updateProducto } from '../services/productoService';
import { getCategorias } from '../services/categoriaService';
import { getProveedores } from '../services/proveedorService';

export default function ProductosPage() {
  //1. Estado
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Producto | null>(null);

  //Estados para formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(0);
  const [categoriaId, setCategoriaId] = useState(0);
  const [proveedorId, setProveedorId] = useState(0);

  //2. useEffect -> cargar al montar

  useEffect(() => {
    cargar();
  }, []);

  //3. Funciones: cargar, abrirCrear, abrirEditar, cancelar, guardar, eliminar
  async function cargar() {
    setLoading(true);
    const [prods, cats, provs] = await Promise.all([getProductos(), getCategorias(), getProveedores()]);
    setProductos(prods);
    setCategorias(cats);
    setProveedores(provs);
    setLoading(false);
  }

  function abrirCrear() {
    setEditando(null);
    setNombre('');
    setPrecio(0);
    setStock(0);
    setStockMinimo(0);
    setCategoriaId(0);
    setProveedorId(0);
    setMostrarForm(true);
  }

  function abrirEditar(prods: Producto) {
    setEditando(prods);
    setNombre(prods.nombre);
    setPrecio(prods.precio);
    setStock(prods.stock);
    setStockMinimo(prods.stockMinimo);
    setCategoriaId(prods.categoriaId);
    setProveedorId(prods.proveedorId);
    setMostrarForm(true);
  }

  async function guardar() {
    if (!nombre.trim()) return;
    if (editando) {
      await updateProducto(editando.id, {
        nombre: nombre,
        precio: precio,
        stock: stock,
        stockMinimo: stockMinimo,
        categoriaId: categoriaId,
        proveedorId: proveedorId,
      });
    } else {
      await createProducto({
        nombre: nombre,
        precio: precio,
        stock: stock,
        stockMinimo: stockMinimo,
        categoriaId: categoriaId,
        proveedorId: proveedorId,
      });
    }
    cancelar();
    cargar();
  }

  async function eliminar(id: number) {
    if (!confirm('¿Eliminar este producto?')) return;
    await deleteProducto(id);
    cargar();
  }

  function cancelar() {
    setMostrarForm(false);
    setEditando(null);
    setNombre('');
    setPrecio(0);
    setStock(0);
    setStockMinimo(0);
    setCategoriaId(0);
    setProveedorId(0);
  }

  //4. TSX: botón "Nueva", formulario
  return (
    <div>
      {/* Parte 1 - Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Productos</h1>
        <button onClick={abrirCrear}>+ Nuevo</button>
      </div>
      {/* Parte 2 - Formulario condicional */}
      {mostrarForm && (
        <div>
          <h2>{editando ? 'Editar' : 'Nueva'}</h2>
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
          <label>Precio</label>
          <input value={precio} onChange={e => setPrecio(Number(e.target.value))} />
          <label>Stock</label>
          <input value={stock} onChange={e => setStock(Number(e.target.value))} />
          <label>Stock Minimo</label>
          <input value={stockMinimo} onChange={e => setStockMinimo(Number(e.target.value))} />
          <label>Categoria</label>
          <select value={categoriaId} onChange={e => setCategoriaId(Number(e.target.value))}>
            <option value={0}>-- Selecciona --</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          {categorias.length === 0 && <p>No hay categorías registradas.</p>}
          <label>Proveedor</label>
          <select value={proveedorId} onChange={e => setProveedorId(Number(e.target.value))}>
            <option value={0}>-- Selecciona --</option>
            {proveedores.map(prov => (
              <option key={prov.id} value={prov.id}>
                {prov.nombre}
              </option>
            ))}
          </select>
          {proveedores.length === 0 && <p>No hay proveedores registradas.</p>}
          <button onClick={guardar} disabled={categoriaId === 0 || proveedorId === 0}>
            Guardar
          </button>
          <button onClick={cancelar}>Cancelar</button>
        </div>
      )}
      {/* Parte 3 - Tabla */}
      {loading ? (
        <p>Cargando Productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos registrados</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Stock Minimo</th>
              <th>Categoria</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.precio.toFixed(2)}</td>
                <td>{prod.stock}</td>
                <td>{prod.stockMinimo}</td>
                <td>{categorias.find(c => c.id === prod.categoriaId)?.nombre ?? '-'}</td>
                <td>{proveedores.find(p => p.id === prod.proveedorId)?.nombre ?? '-'}</td>
                <td>
                  <button onClick={() => abrirEditar(prod)}>Editar</button>
                  <button onClick={() => eliminar(prod.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
