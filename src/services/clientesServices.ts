import { apiClient } from './apiClient';
import type { Cliente } from '../types/inventario';

export async function getClientes(): Promise<Cliente[]> {
  return apiClient.get<Cliente[]>('/api/Clientes');
}

export async function getClienteById(id: number): Promise<Cliente> {
  return apiClient.get<Cliente>(`/api/Clientes/${id}`);
}

export async function createCliente(data: Omit<Cliente, 'id'>): Promise<Cliente> {
  return apiClient.post<Cliente>('/api/Clientes', data);
}

export async function updateCliente(id: number, data: Omit<Cliente, 'id'>): Promise<void> {
  return apiClient.put<void>(`/api/Clientes/${id}`, data);
}

export async function deleteCliente(id: number): Promise<void> {
  return apiClient.delete(`/api/Clientes/${id}`);
}
