import { Routes, Route, Link } from 'react-router-dom'
import { ProductList } from './features/products/ProductList'
import ProductsPage from './components/ProductsPage'
import ProductDetails from './components/ProductDetails'

export default function App() {
  return (
    <div>
      {/* Header with navigation */}
      <header style={{ padding: '16px', backgroundColor: '#0070f3', color: '#fff' }}>
        <nav
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: '#0070f3',
    color: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '0 0 12px 12px',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  }}
>
  {/* Logo / Brand */}
  <Link
    to="/"
    aria-label="Home"
    style={{
      fontWeight: 'bold',
      fontSize: '24px',
      color: '#fff',
      textDecoration: 'none'
    }}
    onMouseEnter={e => (e.currentTarget.style.color = '#ffdd57')}
    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
  >
    Listings Manager
  </Link>

  {/* Navigation Links */}
  <div style={{ display: 'flex', gap: '20px', fontSize: '16px' }}>
    <Link
      to="/list"
      style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#ffdd57')}
      onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
    >
      Product List
    </Link>
    <Link
      to="/about"
      style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#ffdd57')}
      onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
    >
      About
    </Link>
    <Link
      to="/contact"
      style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#ffdd57')}
      onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
    >
      Contact
    </Link>
  </div>
</nav>
      </header>

      {/* Main content */}
      <main>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          {/* Optional: keep ProductList route if needed */}
          <Route path="/list" element={<ProductList />} />
        </Routes>
      </main>
    </div>
  )
}
