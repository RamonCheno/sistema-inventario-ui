import { useEffect, useState } from 'react';
import type { Cliente, Producto, Venta } from '../types/inventario';
import { getProductos } from '../services/productoService';
import { getClientes } from '../services/clientesServices';
import { createVenta, deleteVenta, getVentas } from '../services/ventasServices';
import { ApiError } from '../services/apiClient';

export default function VentasPage() {
  //1. Estado
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [clienteId, setClienteId] = useState(0);
  const [detalles, setDetalles] = useState<{ productoId: number; cantidad: number }[]>([]);

  //2. useEffect -> cargar al montar
  useEffect(() => {
    cargar();
  }, []);

  //3. Funciones: cargar, abrirCrear, abrirEditar, cancelar, guardar, eliminar
  async function cargar() {
    setLoading(true);
    const [prods, vents, clis] = await Promise.all([getProductos(), getVentas(), getClientes()]);
    setProductos(prods);
    setVentas(vents);
    setClientes(clis);
    setLoading(false);
  }

  function agregarDetalles() {
    setDetalles([...detalles, { productoId: 0, cantidad: 1 }]);
  }

  function actualizarDetalles(index: number, campo: 'productoId' | 'cantidad', valor: number) {
    const nuevos = [...detalles];
    nuevos[index] = { ...nuevos[index], [campo]: valor };
    setDetalles(nuevos);
  }

  function eliminarDetalles(index: number) {
    setDetalles(detalles.filter((_, i) => i !== index));
  }

  async function guardar() {
    if (clienteId === 0 || detalles.length === 0) return;
    try {
      await createVenta(clienteId, detalles);
      cancelar();
      cargar();
    } catch (error) {
      alert(error instanceof ApiError ? error.message : 'Ocurrió un error inesperado.');
    }
  }

  function abrirCrear() {
    setClienteId(0);
    setDetalles([]);
    setMostrarForm(true);
  }

  function cancelar() {
    setMostrarForm(false);
    setClienteId(0);
    setDetalles([]);
  }
  async function eliminar(id: number) {
    if (!confirm('¿Eliminar esta venta?')) return;
    try {
      await deleteVenta(id);
      cargar();
    } catch (error) {
      alert(error instanceof ApiError ? error.message : 'Ocurrió un error inesperado.');
    }
  }

  //4. TSX: botón "Nueva", formulario
  return (
    <div>
      {/* Parte 1 — Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Ventas</h1>
        <button onClick={abrirCrear}>+ Nueva</button>
      </div>
      {/* Parte 2 — Formulario */}
      {mostrarForm && (
        <div>
          <h2>Nueva Venta</h2>
          <label>Cliente</label>
          <select value={clienteId} onChange={e => setClienteId(Number(e.target.value))}>
            <option value={0}>-- Seleccion cliente --</option>
            {clientes.map(cli => (
              <option key={cli.id} value={cli.id}>
                {cli.nombre}
              </option>
            ))}
          </select>

          <button onClick={agregarDetalles}>+ Agregar producto</button>

          {detalles.map((detalle, index) => (
            <div key={index}>
              <select value={detalle.productoId} onChange={e => actualizarDetalles(index, 'productoId', Number(e.target.value))}>
                <option value={0}>-- Selecciona producto --</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              <input type="number" value={detalle.cantidad} onChange={e => actualizarDetalles(index, 'cantidad', Number(e.target.value))} />
              <button onClick={() => eliminarDetalles(index)}>X</button>
            </div>
          ))}
          <button onClick={guardar} disabled={clienteId === 0 || detalles.length === 0}>
            Guardar
          </button>
          <button onClick={cancelar}>Cancelar</button>
        </div>
      )}
      {/* Parte 3 — Tabla */}
      {loading ? (
        <p>Cargando ventas...</p>
      ) : ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Detalles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(venta => (
              <tr key={venta.id}>
                <td>{venta.id}</td>
                <td>{venta.fecha}</td>
                <td>{clientes.find(c => c.id === venta.clienteId)?.nombre ?? '-'}</td>
                <td>{venta.total.toFixed(2)}</td>
                <td>{venta.detalles.length} producto(s)</td>
                <td>
                  <button onClick={() => eliminar(venta.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
