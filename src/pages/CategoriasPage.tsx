import { useEffect, useState } from 'react';
import type { Categoria } from '../types/inventario';
import { getCategorias, updateCategoria, deleteCategoria, createCategoria } from '../services/categoriaService';

export default function CategoriasPage() {
  //1. Estado
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Categoria | null>(null);
  const [nombre, setNombre] = useState('');

  //2. useEffect -> cargar al montar
  useEffect(() => {
    cargar();
  }, []);

  //3. Funciones: cargar, abrirCrear, abrirEditar, cancelar, guardar, eliminar
  async function cargar() {
    setLoading(true);
    setCategorias(await getCategorias());
    setLoading(false);
  }

  function abrirCrear() {
    setEditando(null);
    setNombre('');
    setMostrarForm(true);
  }

  function abrirEditar(cat: Categoria) {
    setEditando(cat);
    setNombre(cat.Nombre);
    setMostrarForm(true);
  }

  async function guardar() {
    if (!nombre.trim()) return;
    if (editando) {
      await updateCategoria({ ...editando, Nombre: nombre });
    } else {
      await createCategoria({ Nombre: nombre });
    }
    cancelar();
    cargar();
  }

  async function eliminar(id: number) {
    if (!confirm('¿Eliminar esta categoría?')) return;
    await deleteCategoria(id);
    cargar();
  }

  function cancelar() {
    setMostrarForm(false);
    setEditando(null);
    setNombre('');
  }

  //4. TSX: botón "Nueva", formulario condicional, tabla
  return (
    <div>
      {/* Parte 1 - Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Categorias</h1>
        <button onClick={abrirCrear}>+ Nueva</button>
      </div>
      {/* Parte 2 - Formulario condicional */}
      {mostrarForm && (
        <div>
          <h2>{editando ? 'Editar' : 'Nueva'}</h2>
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} />
          <button onClick={guardar}>Guardar</button>
          <button onClick={cancelar}>Cancelar</button>
        </div>
      )}
      {/* Parte 3 - Tabla */}
      {loading ? (
        <p>Cargando categorias...</p>
      ) : categorias.length === 0 ? (
        <p>No hay categorías registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(cat => (
              <tr key={cat.Id}>
                <td>{cat.Id}</td>
                <td>{cat.Nombre}</td>
                <td>
                  <button onClick={() => abrirEditar(cat)}>Editar</button>
                  <button onClick={() => eliminar(cat.Id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
