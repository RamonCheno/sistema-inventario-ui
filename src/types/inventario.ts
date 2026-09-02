export interface Categoria {
  id: number;
  nombre: string;
}

export interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  categoriaId: number;
  proveedorId: number;
}

export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

export interface DetalleVenta {
  id: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
}

export interface Venta {
  id: number;
  fecha: string;
  total: number;
  clienteId: number;
  detalles: DetalleVenta[];
}
