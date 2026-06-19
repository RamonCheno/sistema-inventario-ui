import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/categorias', label: 'Categorias' },
  { to: '/proveedores', label: 'Proveedores' },
  { to: '/productos', label: 'Productos' },
  { to: '/clientes', label: 'Clientes' },
  { to: '/ventas', label: 'Ventas' },
];

export default function Layout() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav
        style={{
          width: 200,
          background: '#1e1e2e',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <h2 style={{ color: '#cdd6f4', marginBottom: '1rem' }}>Inventario</h2>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? '#89b4fa' : '#cdd6f4',
              textDecoration: 'none',
              padding: '0.4rem 0.6rem',
              borderRadius: 4,
              background: isActive ? '#313244' : 'transparent',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
}
