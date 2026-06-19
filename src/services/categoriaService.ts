import { callSoap } from './soapClient';
import type { Categoria } from '../types/inventario';

export async function getCategorias(): Promise<Categoria[]> {
  const result = await callSoap('GetCategorias');
  return JSON.parse(result);
}

export async function getCategoriaById(id: number): Promise<Categoria> {
  const result = await callSoap('GetCategoriaById', { id: String(id) });
  return JSON.parse(result);
}

export async function createCategoria(data: Omit<Categoria, 'Id'>): Promise<Categoria> {
  const result = await callSoap('CreateCategoria', { json: JSON.stringify(data) });
  return JSON.parse(result);
}

export async function updateCategoria(data: Categoria): Promise<Categoria> {
  const result = await callSoap('UpdateCategoria', { json: JSON.stringify(data) });
  return JSON.parse(result);
}

export async function deleteCategoria(id: number): Promise<boolean> {
  const result = await callSoap('DeleteCategoria', { id: String(id) });
  return result === 'true';
}
