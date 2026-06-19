# sistema-inventario-ui

Frontend del Sistema de Inventario y Ventas. Aplicación React que consume un servicio WCF SOAP para gestionar productos, categorías, proveedores, clientes y ventas.

Forma parte del monorepo [sistema-inventario](https://github.com/RamonCheno/sistema-inventario).

## Stack

- **React 19** + **TypeScript**
- **Vite** — bundler y dev server
- **pnpm** — gestor de paquetes
- **React Router DOM v7** — navegación SPA
- **React Hook Form + Zod** — formularios y validación
- **Fetch API** — comunicación SOAP con el backend WCF

## Requisitos previos

- Node.js 18+
- pnpm
- Backend [`sistema-inventario-ws`](https://github.com/RamonCheno/sistema-inventario-ws) corriendo en `http://localhost:51842`

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Build

```bash
pnpm build
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo con HMR |
| `pnpm build` | Compila TypeScript y genera el bundle de producción |
| `pnpm preview` | Previsualiza el bundle de producción localmente |
| `pnpm lint` | Ejecuta ESLint sobre el proyecto |

## Estructura del proyecto

```
src/
├── components/
│   └── Layout.tsx          ← Componente de layout principal con navegación
├── pages/
│   ├── CategoriasPage.tsx  ← CRUD de categorías
│   ├── ClientesPage.tsx    ← CRUD de clientes
│   ├── ProductosPage.tsx   ← CRUD de productos (con stock y proveedor)
│   ├── ProveedorPage.tsx   ← CRUD de proveedores
│   └── VentasPage.tsx      ← Registro y consulta de ventas
├── services/
│   ├── soapClient.ts       ← Cliente SOAP genérico (fetch + XML)
│   ├── categoriaService.ts
│   ├── clientesServices.ts
│   ├── productoService.ts
│   ├── proveedorService.ts
│   └── ventasServices.ts
├── types/
│   └── inventario.ts       ← Interfaces TypeScript del dominio
└── main.tsx
```

## Comunicación con el backend

El cliente SOAP (`src/services/soapClient.ts`) construye envelopes SOAP manualmente y los envía mediante `fetch` al endpoint:

```
http://localhost:51842/InventarioService.svc
```

## Modelos del dominio

| Entidad | Campos principales |
|---|---|
| `Categoria` | Id, Nombre |
| `Proveedor` | Id, Nombre, Telefono, Email |
| `Producto` | Id, Nombre, Precio, Stock, StockMinimo, CategoriaId, ProveedorId |
| `Cliente` | Id, Nombre, Telefono, Email |
| `Venta` | Id, Fecha, Total, ClienteId, Detalles[] |
| `DetalleVenta` | Id, ProductoId, Cantidad, PrecioUnitario |

## Contexto

Proyecto de aprendizaje — Fase 2 del roadmap React JS → React Native.
Enfoque: React JS Avanzado + integración con servicios WCF SOAP (C# / .NET Framework 4.8).
