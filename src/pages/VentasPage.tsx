import { useEffect, useState } from 'react';
import type { Cliente, Producto, Venta } from '../types/inventario';
import { getProductos } from '../services/productoService';
import { getClientes } from '../services/clientesServices';
import { createVenta, deleteVenta, getVentas } from '../services/ventasServices';

export default function VentasPage() {
  //1. Estado
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [clienteId, setClienteId] = useState(0);
  const [detalles, setDetalles] = useState<{ ProductoId: number; Cantidad: number }[]>([]);

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
    setDetalles([...detalles, { ProductoId: 0, Cantidad: 1 }]);
  }

  function actualizarDetalles(index: number, campo: 'ProductoId' | 'Cantidad', valor: number) {
    const nuevos = [...detalles];
    nuevos[index] = { ...nuevos[index], [campo]: valor };
    setDetalles(nuevos);
  }

  function eliminarDetalles(index: number) {
    setDetalles(detalles.filter((_, i) => i !== index));
  }

  async function guardar() {
    if (clienteId === 0 || detalles.length === 0) return;
    await createVenta(clienteId, detalles);
    cancelar();
    cargar();
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
    await deleteVenta(id);
    cargar();
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
              <option key={cli.Id} value={cli.Id}>
                {cli.Nombre}
              </option>
            ))}
          </select>

          <button onClick={agregarDetalles}>+ Agregar producto</button>

          {detalles.map((detalle, index) => (
            <div key={index}>
              <select value={detalle.ProductoId} onChange={e => actualizarDetalles(index, 'ProductoId', Number(e.target.value))}>
                <option value={0}>-- Selecciona producto --</option>
                {productos.map(p => (
                  <option key={p.Id} value={p.Id}>
                    {p.Nombre}
                  </option>
                ))}
              </select>
              <input type="number" value={detalle.Cantidad} onChange={e => actualizarDetalles(index, 'Cantidad', Number(e.target.value))} />
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
              <tr key={venta.Id}>
                <td>{venta.Id}</td>
                <td>{venta.Fecha}</td>
                <td>{venta.Cliente?.Nombre ?? '-'}</td>
                <td>{venta.Total.toFixed(2)}</td>
                <td>{venta.Detalles.length} producto(s)</td>
                <td>
                  <button onClick={() => eliminar(venta.Id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
