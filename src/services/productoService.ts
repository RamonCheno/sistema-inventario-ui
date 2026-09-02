import { apiClient } from './apiClient';
import type { Producto } from '../types/inventario';

export async function getProductos(): Promise<Producto[]> {
  return apiClient.get<Producto[]>('/api/Productos');
}

export async function getProductoById(id: number): Promise<Producto> {
  return apiClient.get<Producto>(`/api/Productos/${id}`);
}

export async function createProducto(data: Omit<Producto, 'id'>): Promise<Producto> {
  return apiClient.post<Producto>('/api/Productos', data);
}

export async function updateProducto(id: number, data: Omit<Producto, 'id'>): Promise<void> {
  return apiClient.put<void>(`/api/Productos/${id}`, data);
}

export async function deleteProducto(id: number): Promise<void> {
  return apiClient.delete(`/api/Productos/${id}`);
}
