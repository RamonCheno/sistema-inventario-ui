import { useEffect, useState } from 'react';
import type { Cliente } from '../types/inventario';
import { createCliente, deleteCliente, getClientes, updateCliente } from '../services/clientesServices';

export default function ClientesPage() {
  //1. Estado
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Cliente | null>(null);
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
    setClientes(await getClientes());
    setLoading(false);
  }

  function abrirCrear() {
    setEditando(null);
    setNombre('');
    setTelefono('');
    setEmail('');
    setMostrarForm(true);
  }

  function abrirEditar(cli: Cliente) {
    setEditando(cli);
    setNombre(cli.Nombre);
    setTelefono(cli.Telefono ?? '');
    setEmail(cli.Email ?? '');
    setMostrarForm(true);
  }

  async function guardar() {
    if (!nombre.trim()) return;
    if (editando) {
      await updateCliente({ ...editando, Nombre: nombre, Email: email, Telefono: telefono });
    } else {
      await createCliente({ Nombre: nombre, Email: email, Telefono: telefono });
    }
    cancelar();
    cargar();
  }

  async function eliminar(id: number) {
    if (!confirm('¿Eliminar este cliente?')) return;
    await deleteCliente(id);
    cargar();
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
        <h1>Clientes</h1>
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
        <p>Cargando clientes...</p>
      ) : clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
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
            {clientes.map(cli => (
              <tr key={cli.Id}>
                <td>{cli.Id}</td>
                <td>{cli.Nombre}</td>
                <td>{cli.Email ?? '-'}</td>
                <td>{cli.Telefono ?? '-'}</td>
                <td>
                  <button onClick={() => abrirEditar(cli)}>Editar</button>
                  <button onClick={() => eliminar(cli.Id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
