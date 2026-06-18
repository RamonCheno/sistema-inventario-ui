import { callSoap } from './soapClient'
import type { Cliente } from '../types/inventario'

export async function getClientes(): Promise<Cliente[]> {
  const result = await callSoap('GetClientes')
  return JSON.parse(result)
}

export async function getClienteById(id: number): Promise<Cliente> {
  const result = await callSoap('GetClienteById', { id: String(id) })
  return JSON.parse(result)
}

export async function createCliente(data: Omit<Cliente, 'Id'>): Promise<Cliente> {
  const result = await callSoap('CreateCliente', { json: JSON.stringify(data) })
  return JSON.parse(result)
}

export async function updateCliente(data: Cliente): Promise<Cliente> {
  const result = await callSoap('UpdateCliente', { json: JSON.stringify(data) })
  return JSON.parse(result)
}

export async function deleteCliente(id: number): Promise<boolean> {
  const result = await callSoap('DeleteCliente', { id: String(id) })
  return result === 'true'
}