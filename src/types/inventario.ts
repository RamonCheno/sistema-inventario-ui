export interface Categoria {
  Id: number;
  Nombre: string;
}

export interface Proveedor {
  Id: number;
  Nombre: string;
  Telefono?: string;
  Email?: string;
}

export interface Producto {
  Id: number;
  Nombre: string;
  Precio: number;
  Stock: number;
  StockMinimo: number;
  CategoriaId: number;
  Categoria?: Categoria;
  ProveedorId: number;
  Proveedor?: Proveedor;
}

export interface Cliente {
  Id: number;
  Nombre: string;
  Telefono?: string;
  Email?: string;
}

export interface DetalleVenta {
  Id: number;
  ProductoId: number;
  Producto?: Producto;
  Cantidad: number;
  PrecioUnitario: number;
}

export interface Venta {
  Id: number;
  Fecha: string;
  Total: number;
  ClienteId: number;
  Cliente?: Cliente;
  Detalles: DetalleVenta[];
}
