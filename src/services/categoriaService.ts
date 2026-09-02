import { apiClient } from './apiClient';
import type { Categoria } from '../types/inventario';

export async function getCategorias(): Promise<Categoria[]> {
  return apiClient.get<Categoria[]>('/api/Categorias');
}

export async function getCategoriaById(id: number): Promise<Categoria> {
  return apiClient.get<Categoria>(`/api/Categorias/${id}`);
}

export async function createCategoria(data: Omit<Categoria, 'id'>): Promise<Categoria> {
  return apiClient.post<Categoria>('/api/Categorias', data);
}

export async function updateCategoria(id: number, data: Omit<Categoria, 'id'>): Promise<void> {
  return apiClient.put<void>(`/api/Categorias/${id}`, data);
}

export async function deleteCategoria(id: number): Promise<void> {
  return apiClient.delete(`/api/Categorias/${id}`);
}
