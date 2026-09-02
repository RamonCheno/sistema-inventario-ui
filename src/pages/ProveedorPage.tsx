import { useEffect, useState } from 'react';
import type { Proveedor } from '../types/inventario';
import { createProveedor, deleteProveedor, getProveedores, updateProveedor } from '../services/proveedorService';
import { ApiError } from '../services/apiClient';

export default function ProveedoresPage() {
  //1. Estado
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Proveedor | null>(null);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  //2. useEffect -> cargar al montar
  useEffect(() => {
    cargar();
  }, []);

  //3. Funciones: cargar, abrirCrear, abrirEditar, cancelar, guardar, eliminar
  async function cargar() {
    setLoading(true);
    setProveedores(await getProveedores());
    setLoading(false);
  }
  function abrirCrear() {
    setEditando(null);
    setNombre('');
    setTelefono('');
    setEmail('');
    setMostrarForm(true);
  }

  function abrirEditar(prov: Proveedor) {
    setEditando(prov);
    setNombre(prov.nombre);
    setTelefono(prov.telefono ?? '');
    setEmail(prov.email ?? '');
    setMostrarForm(true);
  }

  async function guardar() {
    if (!nombre.trim()) return;
    try {
      if (editando) {
        await updateProveedor(editando.id, { nombre, email, telefono });
      } else {
        await createProveedor({ nombre, email, telefono });
      }
      cancelar();
      cargar();
    } catch (error) {
      alert(error instanceof ApiError ? error.message : 'Ocurrió un error inesperado.');
    }
  }

  async function eliminar(id: number) {
    if (!confirm('¿Eliminar este proveedor?')) return;
    try {
      await deleteProveedor(id);
      cargar();
    } catch (error) {
      alert(error instanceof ApiError ? error.message : 'Ocurrió un error inesperado.');
    }
  }

  function cancelar() {
    setMostrarForm(false);
    setEditando(null);
    setNombre('');
    setTelefono('');
    setEmail('');
  }

  //4. TSX: botón "Nueva", formulario condicional, tabla
  return (
    <div>
      {/* Parte 1 - Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Proveedores</h1>
        <button onClick={abrirCrear}>+ Nueva</button>
      </div>
      {/* Parte 2 - Formulario condicional */}
      {mostrarForm && (
        <div>
          <h2>{editando ? 'Editar' : 'Nueva'}</h2>
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
          <label>Telefono</label>
          <input value={telefono} onChange={e => setTelefono(e.target.value)} />
          <button onClick={guardar}>Guardar</button>
          <button onClick={cancelar}>Cancelar</button>
        </div>
      )}
      {/* Parte 3 - Tabla */}
      {loading ? (
        <p>Cargando proveedores...</p>
      ) : proveedores.length === 0 ? (
        <p>No hay proveedores registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map(prov => (
              <tr key={prov.id}>
                <td>{prov.id}</td>
                <td>{prov.nombre}</td>
                <td>{prov.email ?? '-'}</td>
                <td>{prov.telefono ?? '-'}</td>
                <td>
                  <button onClick={() => abrirEditar(prov)}>Editar</button>
                  <button onClick={() => eliminar(prov.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
