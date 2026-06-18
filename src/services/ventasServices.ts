import { callSoap } from './soapClient'
import type { Venta, DetalleVenta } from '../types/inventario'

type DetalleInput = Pick<DetalleVenta, 'ProductoId' | 'Cantidad'>

export async function getVentas(): Promise<Venta[]> {
  const result = await callSoap('GetVentas')
  return JSON.parse(result)
}

export async function getVentaById(id: number): Promise<Venta> {
  const result = await callSoap('GetVentaById', { id: String(id) })
  return JSON.parse(result)
}

export async function createVenta(clienteId: number, detalles: DetalleInput[]): Promise<Venta> {
  const data = {
    ClienteId: clienteId,
    Fecha: new Date().toISOString(),
    Detalles: detalles
  }
  const result = await callSoap('CreateVenta', { json: JSON.stringify(data) })
  return JSON.parse(result)
}

export async function deleteVenta(id: number): Promise<boolean> {
  const result = await callSoap('DeleteVenta', { id: String(id) })
  return result === 'true'
}