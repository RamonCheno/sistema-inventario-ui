import { callSoap } from "./soapClient";
import type { Producto } from "../types/inventario";

type ProductoCreate = Omit<Producto, 'Id' | 'Categoria' | 'Proveedor'>;
type ProductoUpdate = Omit<Producto, 'Categoria' | 'Proveedor'>;

export async function getProductos(): Promise<Producto[]> {
    const result = await callSoap('GetProductos');
    return JSON.parse(result);
}

export async function getProductoById(id: number): Promise<Producto> {
    const result = await callSoap('GetProductoById', {id: String(id) });
    return JSON.parse(result);
}

export async function createProducto(data: ProductoCreate): Promise<Producto> {
    const result = await callSoap('CreateProducto', { json: JSON.stringify(data) });
    return JSON.parse(result);
}

export async function updateProducto(data: ProductoUpdate): Promise<Producto> {
    const result = await callSoap('UpdateProducto',{ json: JSON.stringify(data) });
    return JSON.parse(result);
}

export async function deleteProducto(id: number): Promise<boolean> {
    const result = await callSoap('DeleteProducto', { Id: String(id) });
    return result ==='true';
}