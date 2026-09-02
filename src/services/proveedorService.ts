import { apiClient } from './apiClient';
import type { Proveedor } from '../types/inventario';

export async function getProveedores(): Promise<Proveedor[]> {
  return apiClient.get<Proveedor[]>('/api/Proveedores');
}

export async function getProveedorById(id: number): Promise<Proveedor> {
  return apiClient.get<Proveedor>(`/api/Proveedores/${id}`);
}

export async function createProveedor(data: Omit<Proveedor, 'id'>): Promise<Proveedor> {
  return apiClient.post<Proveedor>('/api/Proveedores', data);
}

export async function updateProveedor(id: number, data: Omit<Proveedor, 'id'>): Promise<void> {
  return apiClient.put<void>(`/api/Proveedores/${id}`, data);
}

export async function deleteProveedor(id: number): Promise<void> {
  return apiClient.delete(`/api/Proveedores/${id}`);
}
