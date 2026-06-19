import { callSoap } from './soapClient';
import type { Proveedor } from '../types/inventario';

export async function getProveedores(): Promise<Proveedor[]> {
  const result = await callSoap('GetProveedores');
  return JSON.parse(result);
}

export async function getProveedorById(id: number): Promise<Proveedor> {
  const result = await callSoap('GetProveedorById', { id: String(id) });
  return JSON.parse(result);
}

export async function createProveedor(data: Omit<Proveedor, 'Id'>): Promise<Proveedor> {
  const result = await callSoap('CreateProveedor', { json: JSON.stringify(data) });
  return JSON.parse(result);
}

export async function updateProveedor(data: Proveedor): Promise<Proveedor> {
  const result = await callSoap('UpdateProveedor', { json: JSON.stringify(data) });
  return JSON.parse(result);
}

export async function deleteProveedor(id: number): Promise<boolean> {
  const result = await callSoap('DeleteProveedor', { id: String(id) });
  return result === 'true';
}
