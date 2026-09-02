import { apiClient } from './apiClient';
import type { Venta } from '../types/inventario';

type DetalleInput = { productoId: number; cantidad: number };

export async function getVentas(): Promise<Venta[]> {
  return apiClient.get<Venta[]>('/api/Ventas');
}

export async function getVentaById(id: number): Promise<Venta> {
  return apiClient.get<Venta>(`/api/Ventas/${id}`);
}

export async function createVenta(clienteId: number, detalles: DetalleInput[]): Promise<Venta> {
  return apiClient.post<Venta>('/api/Ventas', { clienteId, detalles });
}

export async function deleteVenta(id: number): Promise<void> {
  return apiClient.delete(`/api/Ventas/${id}`);
}
