import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import { orderAPI, productAPI, wholesaleAPI, couponAPI } from '../../utils/api'
import toast from 'react-hot-toast'

const ADMIN_STYLE = {
  wrapper: { display: 'flex', minHeight: '100vh', background: '#0a1a10', fontFamily: "'DM Sans', sans-serif" },
  sidebar: { width: 240, background: '#071f12', borderRight: '1px solid rgba(201,149,42,0.2)', padding: '2rem 0', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' },
  main: { flex: 1, padding: '2.5rem', overflowX: 'hidden' },
}

export function AdminSidebar({ active }) {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const links = [
    {
      to: '/admin',
      label: 'Dashboard',
      key: 'dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle' }}>
          <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    {
      to: '/admin/products',
      label: 'Products',
      key: 'products',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle' }}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
          <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
      )
    },
    {
      to: '/admin/orders',
      label: 'Orders',
      key: 'orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle' }}>
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
        </svg>
      )
    },
    {
      to: '/admin/coupons',
      label: 'Coupons',
      key: 'coupons',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle' }}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
      )
    },
    {
      to: '/',
      label: 'View Site',
      key: 'site',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', display: 'inline-block', verticalAlign: 'middle' }}>
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
  ]
  return (
    <div style={ADMIN_STYLE.sidebar}>
      <div style={{ padding: '0 1.5rem 2rem', borderBottom: '1px solid rgba(201,149,42,0.15)' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '1.35rem', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Sawai Admin
        </div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '2px', marginTop: '0.4rem', fontFamily: "'DM Sans', sans-serif" }}>CONTROL PANEL</div>
      </div>
      <nav style={{ padding: '1.25rem 0.75rem' }}>
        {links.map(l => (
          <Link key={l.key} to={l.to} style={{
            display: 'flex', alignItems: 'center', padding: '0.85rem 1rem', color: active === l.key ? '#e4b84a' : 'rgba(255,255,255,0.55)',
            textDecoration: 'none', fontSize: '0.85rem', background: active === l.key ? 'rgba(201,149,42,0.08)' : 'transparent',
            borderRadius: '4px', border: active === l.key ? '1px solid rgba(201,149,42,0.2)' : '1px solid transparent',
            marginBottom: '0.25rem', transition: 'all 0.2s',
          }}>{l.icon}{l.label}</Link>
        ))}
        <button onClick={() => { logout(); navigate('/') }} style={{ display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left', padding: '0.85rem 1rem', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '4px', marginTop: '1rem', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.target.style.background = 'rgba(255,0,0,0.05)'; e.target.style.color = '#ff6b6b'; }}
          onMouseLeave={(e) => { e.target.style.background = 'none'; e.target.style.color = 'rgba(255,255,255,0.4)'; }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </nav>
    </div>
  )
}

export function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0, leads: 0 })
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [recentOrders, setRecentOrders] = useState([])

  // Dashboard analytics calculations
  const [aov, setAov] = useState(0)
  const [leadConversionRate, setLeadConversionRate] = useState(0)

  useEffect(() => {
    Promise.allSettled([
      orderAPI.getAll({ page: 0, size: 50 }), // Get recent bulk orders for calculations
      productAPI.getAll({ paginate: false }),
      wholesaleAPI.getAllLeads()
    ])
      .then(([ordersRes, productsRes, leadsRes]) => {
        const o = ordersRes.value?.data?.content || []
        const p = productsRes.value?.data || []
        const leads = leadsRes.value?.data || []

        const totalRevenue = o.reduce((s, x) => s + (x.total || 0), 0)
        const totalOrders = o.length

        setStats({
          orders: totalOrders,
          revenue: totalRevenue,
          products: p.length,
          leads: leads.length,
        })

        // AOV Calculation
        setAov(totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0)

        // Lead Conversion Rate: Leads marked as 'CONVERTED' / Total Leads
        const convertedLeads = leads.filter(l => l.status === 'CONVERTED').length
        setLeadConversionRate(leads.length > 0 ? parseFloat(((convertedLeads / leads.length) * 100).toFixed(1)) : 0)

        // Low stock filter (< 10 items)
        const lowStock = p.filter(prod => prod.stock < 10)
        setLowStockProducts(lowStock)

        // Keep 5 recent orders
        setRecentOrders(o.slice(0, 5))
      })
  }, [])

  const cards = [
    {
      label: 'Total Orders',
      value: stats.orders,
      color: 'linear-gradient(135deg, rgba(26, 92, 62, 0.75), rgba(15, 58, 42, 0.75))',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
          <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
        </svg>
      )
    },
    {
      label: 'Revenue',
      value: `₹${stats.revenue.toLocaleString('en-IN')}`,
      color: 'linear-gradient(135deg, rgba(201, 149, 42, 0.45), rgba(15, 58, 42, 0.75))',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      label: 'Average Order Value (AOV)',
      value: `₹${aov.toLocaleString('en-IN')}`,
      color: 'linear-gradient(135deg, rgba(45, 122, 85, 0.75), rgba(15, 58, 42, 0.75))',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      )
    },
    {
      label: 'Wholesale Conversion',
      value: `${leadConversionRate}%`,
      color: 'linear-gradient(135deg, rgba(15, 58, 42, 0.85), rgba(7, 31, 18, 0.85))',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    },
  ]

  return (
    <div style={ADMIN_STYLE.wrapper}>
      <AdminSidebar active="dashboard" />
      <div style={ADMIN_STYLE.main}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '2.5rem', marginBottom: '2.5rem', fontWeight: 700 }}>Dashboard</h1>
        
        {/* STAT CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {cards.map(c => (
            <div key={c.label} style={{ background: c.color, padding: '2rem 1.75rem', border: '1px solid rgba(201,149,42,0.25)', borderRadius: '8px', backdropFilter: 'blur(10px)', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
              <div style={{ marginBottom: '1rem', color: '#e4b84a' }}>{c.icon}</div>
              <div style={{ color: 'rgba(253, 246, 227, 0.55)', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{c.label}</div>
              <div style={{ color: '#fff', fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, marginTop: '0.4rem' }}>{c.value}</div>
            </div>
          ))}
        </div>

        {/* LOW STOCK ALERTS PANEL */}
        {lowStockProducts.length > 0 && (
          <div style={{ background: 'rgba(220, 38, 38, 0.1)', border: '1px solid rgba(220, 38, 38, 0.35)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2.5rem' }}>
            <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 1rem', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Low Stock Alerts
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>
              {lowStockProducts.map(p => (
                <li key={p.id} style={{ marginBottom: '6px' }}>
                  <strong>{p.name} ({p.size})</strong> is running low! Only <span style={{ color: '#ef4444', fontWeight: 'bold' }}>{p.stock}</span> remaining.
                  <Link to="/admin/products" style={{ color: '#e4b84a', marginLeft: '12px', textDecoration: 'none', fontSize: '0.8rem', borderBottom: '1px dashed' }}>Restock Now</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CHARTS CONTAINER */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Revenue Trend SVG Chart */}
          <div className="glass-panel-dark" style={{ padding: '2rem', border: '1px solid rgba(201,149,42,0.15)', borderRadius: '8px', background: '#071f12' }}>
            <h3 style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 600 }}>Weekly Revenue Trend</h3>
            <div style={{ width: '100%', height: '220px' }}>
              <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e4b84a" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#e4b84a" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Grids */}
                <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                <line x1="40" y1="80" x2="480" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                <line x1="40" y1="130" x2="480" y2="130" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.15)" />
                
                {/* Y Axis Labels */}
                <text x="30" y="34" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="end">₹10K</text>
                <text x="30" y="84" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="end">₹5K</text>
                <text x="30" y="134" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="end">₹2.5K</text>
                <text x="30" y="174" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="end">0</text>

                {/* Smooth curve and area */}
                <path d="M 40 170 Q 113 130 186 100 T 332 50 T 480 30 L 480 170 Z" fill="url(#chartGrad)" />
                <path d="M 40 170 Q 113 130 186 100 T 332 50 T 480 30" fill="none" stroke="#e4b84a" strokeWidth="2.5" />

                {/* Highlight Points */}
                <circle cx="186" cy="100" r="4" fill="#0f3a2a" stroke="#e4b84a" strokeWidth="1.5" />
                <circle cx="332" cy="50" r="4" fill="#0f3a2a" stroke="#e4b84a" strokeWidth="1.5" />
                <circle cx="480" cy="30" r="4" fill="#0f3a2a" stroke="#e4b84a" strokeWidth="1.5" />

                {/* X Axis Labels */}
                <text x="40" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">W1</text>
                <text x="150" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">W2</text>
                <text x="260" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">W3</text>
                <text x="370" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="middle">W4</text>
                <text x="480" y="188" fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="end">W5</text>
              </svg>
            </div>
          </div>

          {/* Size Distribution Donut Chart */}
          <div className="glass-panel-dark" style={{ padding: '2rem', border: '1px solid rgba(201,149,42,0.15)', borderRadius: '8px', background: '#071f12' }}>
            <h3 style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 600 }}>Sales Split by Size</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '220px' }}>
              <svg width="150" height="150" viewBox="0 0 40 40" style={{ transform: 'rotate(-90deg)' }}>
                {/* Donut sectors */}
                <circle cx="20" cy="20" r="15.915" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle cx="20" cy="20" r="15.915" fill="none" stroke="#e4b84a" strokeWidth="4" strokeDasharray="50 100" strokeDashoffset="0" />
                <circle cx="20" cy="20" r="15.915" fill="none" stroke="#2d7a55" strokeWidth="4" strokeDasharray="35 100" strokeDashoffset="-50" />
                <circle cx="20" cy="20" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-85" />
              </svg>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#fff' }}>
                  <span style={{ display: 'block', width: '12px', height: '12px', background: '#e4b84a', borderRadius: '2px' }} />
                  500 ml (50%)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#fff' }}>
                  <span style={{ display: 'block', width: '12px', height: '12px', background: '#2d7a55', borderRadius: '2px' }} />
                  1 Litre (35%)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#fff' }}>
                  <span style={{ display: 'block', width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }} />
                  5 Litre (15%)
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* QUICK ACTIONS */}
        <div className="glass-panel-dark" style={{ padding: '2rem', border: '1px solid rgba(201,149,42,0.25)', borderRadius: '8px' }}>
          <h3 style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '1.25rem', fontWeight: 600 }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/admin/orders" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '12px 24px', borderRadius: '4px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
              </svg>
              View Orders
            </Link>
            <Link to="/admin/products" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '12px 24px', borderRadius: '4px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/>
                <path d="M12 8V2"/>
                <path d="M9 2h6"/>
              </svg>
              Manage Products
            </Link>
            <Link to="/admin/coupons" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '12px 24px', borderRadius: '4px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              </svg>
              Manage Coupons
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminProducts() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  
  // Product state has image upload support
  const [form, setForm] = useState({ name: '', size: '', price: '', originalPrice: '', discount: '', stock: '', badge: '', imageUrl: '', active: true })
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)

  // Product list pagination tracking
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const load = () => {
    productAPI.getAll({ page, size: 5, paginate: true })
      .then(r => {
        setProducts(r.data.content || [])
        setTotalPages(r.data.totalPages || 0)
        setTotalElements(r.data.totalElements || 0)
      })
      .catch(() => {
        setProducts([
          { id: 1, name: 'Sawai Gir Amrut Ghee', size: '500 ml', price: 699, originalPrice: 849, discount: 18, stock: 50, badge: 'BESTSELLER', active: true },
          { id: 2, name: 'Sawai Gir Amrut Ghee', size: '1 Litre', price: 1299, originalPrice: 1549, discount: 16, stock: 30, badge: 'POPULAR', active: true },
          { id: 3, name: 'Sawai Gir Amrut Ghee', size: '5 Litre', price: 5799, originalPrice: 7200, discount: 19, stock: 15, badge: 'BEST VALUE', active: true },
        ])
      })
  }

  useEffect(() => { load() }, [page])

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      if (editing) await productAPI.update(editing, form)
      else await productAPI.create(form)
      toast.success(editing ? 'Product updated!' : 'Product created!')
      setShowForm(false); setEditing(null); load()
    } catch { toast.success('Saved (demo mode)'); setShowForm(false); setEditing(null) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    try { await productAPI.delete(id); toast.success('Deleted!'); load() } catch { toast.success('Deleted (demo)') }
  }

  // Image Upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    setUploading(true)
    try {
      const { data } = await productAPI.uploadImage(formData)
      setForm({ ...form, imageUrl: data.url })
      toast.success('Image uploaded successfully!')
    } catch (err) {
      toast.error('Image upload failed. Storing locally is disabled or server error.')
    } finally {
      setUploading(false)
    }
  }

  const handleRestock = async (id, currentStock) => {
    const amountStr = prompt('Enter quantity to restock:', '20')
    const amt = parseInt(amountStr)
    if (isNaN(amt)) return
    try {
      await productAPI.updateStock(id, currentStock + amt)
      toast.success('Stock updated!')
      load()
    } catch {
      toast.success('Stock updated (demo)')
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
    color: '#fdf6e3', padding: '10px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
    outline: 'none', borderRadius: '4px', transition: 'all 0.2s',
  }

  return (
    <div style={ADMIN_STYLE.wrapper}>
      <AdminSidebar active="products" />
      <div style={ADMIN_STYLE.main}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '2.5rem', fontWeight: 700 }}>Products</h1>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: 'Sawai Gir Amrut Ghee', size: '', price: '', originalPrice: '', discount: '', stock: '', badge: '', imageUrl: '', active: true }) }}
            style={{ background: '#c9952a', color: '#0f3a2a', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', letterSpacing: '1.5px', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', transition: 'background 0.2s' }}
            onMouseEnter={(e) => e.target.style.background = '#e4b84a'}
            onMouseLeave={(e) => e.target.style.background = '#c9952a'}>
            + Add Product
          </button>
        </div>

        {showForm && (
          <div className="glass-panel-dark" style={{ padding: '2rem', marginBottom: '2.5rem', borderRadius: '8px', border: '1px solid rgba(201,149,42,0.3)' }}>
            <h3 style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              {editing ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {[
                  { k: 'name', l: 'Product Name', t: 'text' },
                  { k: 'size', l: 'Size (e.g. 500 ml)', t: 'text' },
                  { k: 'price', l: 'Price (₹)', t: 'number' },
                  { k: 'originalPrice', l: 'Original Price (₹)', t: 'number' },
                  { k: 'discount', l: 'Discount (%)', t: 'number' },
                  { k: 'stock', l: 'Stock Quantity', t: 'number' },
                  { k: 'badge', l: 'Badge (e.g. BESTSELLER)', t: 'text' },
                ].map(f => (
                  <div key={f.k}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>{f.l}</label>
                    <input type={f.t} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} required={['name', 'size', 'price', 'stock'].includes(f.k)} style={inputStyle} />
                  </div>
                ))}
                
                {/* Image upload field */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Product Image (URL or Upload)</label>
                  <input type="text" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="http://example.com/image.jpg" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'block', color: '#fff', fontSize: '0.8rem' }} />
                  {uploading && <span style={{ color: '#e4b84a', fontSize: '0.75rem', marginTop: 4, display: 'block' }}>Uploading file...</span>}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ background: '#c9952a', color: '#0f3a2a', border: 'none', padding: '12px 28px', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '1.5px', fontSize: '0.82rem', textTransform: 'uppercase', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.target.style.background = '#e4b84a'}
                  onMouseLeave={(e) => e.target.style.background = '#c9952a'}>Save Product</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: 'rgba(255,255,255,0.5)', padding: '12px 28px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', textTransform: 'uppercase', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.color = 'rgba(255,255,255,0.8)'; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = 'rgba(255,255,255,0.5)'; }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div style={{ background: '#0f3a2a', border: '1px solid rgba(201,149,42,0.15)', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,149,42,0.2)', background: 'rgba(7, 31, 18, 0.4)' }}>
                {['Product', 'Size', 'Price', 'Stock', 'Badge', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#e4b84a', fontSize: '0.72rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem 1.25rem', color: '#fdf6e3', fontSize: '0.88rem', fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'rgba(253, 246, 227, 0.65)', fontSize: '0.85rem' }}>{p.size}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#c9952a', fontWeight: 700, fontSize: '0.9rem' }}>₹{p.price?.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '1rem 1.25rem', color: p.stock < 10 ? '#ef4444' : 'rgba(253, 246, 227, 0.65)', fontSize: '0.85rem', fontWeight: p.stock < 10 ? 'bold' : 'normal' }}>
                    {p.stock} {p.stock < 10 && <span style={{ background: '#7f1d1d', color: '#fca5a5', padding: '2px 6px', fontSize: '0.65rem', borderRadius: '3px', marginLeft: 8, textTransform: 'uppercase', fontWeight: 'bold' }}>Low</span>}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>{p.badge && <span style={{ background: 'rgba(201,149,42,0.15)', color: '#e4b84a', border: '1px solid rgba(201,149,42,0.3)', borderRadius: '3px', fontSize: '0.65rem', padding: '3px 8px', fontWeight: 700, letterSpacing: '0.5px' }}>{p.badge}</span>}</td>
                  <td style={{ padding: '1rem 1.25rem' }}><span style={{ color: p.active ? '#16a34a' : '#dc2626', fontSize: '0.8rem', fontWeight: 600 }}>{p.active ? '● Active' : '● Inactive'}</span></td>
                  <td style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => { setEditing(p.id); setForm({ ...p }); setShowForm(true) }} style={{ background: '#1a5c3e', color: '#fdf6e3', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: 'background 0.2s' }}>Edit</button>
                    <button onClick={() => handleRestock(p.id, p.stock)} style={{ background: '#c9952a', color: '#0f3a2a', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, fontFamily: "'DM Sans', sans-serif", transition: 'background 0.2s' }}>Restock</button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: 'background 0.2s' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
            <button disabled={page === 0} onClick={() => setPage(page - 1)} style={{ background: page === 0 ? 'rgba(255,255,255,0.05)' : '#1a5c3e', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Previous</button>
            <span style={{ color: '#fff', alignSelf: 'center', fontSize: '0.9rem' }}>Page {page + 1} of {totalPages}</span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} style={{ background: page >= totalPages - 1 ? 'rgba(255,255,255,0.05)' : '#1a5c3e', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Next</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    orderAPI.getAll({ page, size: 8 })
      .then(r => {
        setOrders(r.data.content || [])
        setTotalPages(r.data.totalPages || 0)
      })
      .catch(() => setOrders([
        { id: 'SWI001', customerName: 'Priya Sharma', total: 1299, status: 'DELIVERED', createdAt: '2025-05-01T12:00:00Z', items: [{ size: '1L', qty: 1 }] },
        { id: 'SWI002', customerName: 'Ramesh Patil', total: 5799, status: 'PROCESSING', createdAt: '2025-05-03T15:30:00Z', items: [{ size: '5L', qty: 1 }] },
        { id: 'SWI003', customerName: 'Suresh Mehta', total: 2598, status: 'SHIPPED', createdAt: '2025-05-04T10:15:00Z', items: [{ size: '1L', qty: 2 }] },
      ]))
  }, [page])

  const STATUS_COLORS = { PENDING: '#d97706', PROCESSING: '#2563eb', SHIPPED: '#7c3aed', DELIVERED: '#16a34a', CANCELLED: '#dc2626' }

  const updateStatus = async (id, status) => {
    try { 
      await orderAPI.updateStatus(id, status)
      toast.success('Status updated & Email confirmation sent!') 
    } catch { 
      toast.success('Updated (demo)') 
    }
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  return (
    <div style={ADMIN_STYLE.wrapper}>
      <AdminSidebar active="orders" />
      <div style={ADMIN_STYLE.main}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '2.5rem', marginBottom: '2.5rem', fontWeight: 700 }}>Orders</h1>
        <div style={{ background: '#0f3a2a', border: '1px solid rgba(201,149,42,0.15)', borderRadius: '8px', overflow: 'auto', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,149,42,0.2)', background: 'rgba(7, 31, 18, 0.4)' }}>
                {['Order ID', 'Customer', 'Total', 'Date', 'Status', 'Update Status'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#e4b84a', fontSize: '0.72rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem 1.25rem', color: '#e4b84a', fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 600 }}>{o.id}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#fdf6e3', fontSize: '0.88rem', fontWeight: 500 }}>{o.customerName || o.user?.name || 'Guest'}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#c9952a', fontWeight: 700, fontSize: '0.9rem' }}>₹{o.total?.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'rgba(253, 246, 227, 0.65)', fontSize: '0.82rem' }}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{ background: STATUS_COLORS[o.status] || '#666', color: '#fff', fontSize: '0.7rem', padding: '4px 10px', fontWeight: 700, borderRadius: '4px', letterSpacing: '0.5px' }}>{o.status}</span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                      style={{ background: '#1a5c3e', color: '#fdf6e3', border: '1px solid rgba(201,149,42,0.3)', padding: '6px 12px', borderRadius: '4px', fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", outline: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={(e) => e.target.style.borderColor = '#c9952a'}
                      onMouseLeave={(e) => e.target.style.borderColor = 'rgba(201,149,42,0.3)'}>
                      {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => <option key={s} style={{ background: '#0f3a2a' }}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
            <button disabled={page === 0} onClick={() => setPage(page - 1)} style={{ background: page === 0 ? 'rgba(255,255,255,0.05)' : '#1a5c3e', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Previous</button>
            <span style={{ color: '#fff', alignSelf: 'center', fontSize: '0.9rem' }}>Page {page + 1} of {totalPages}</span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} style={{ background: page >= totalPages - 1 ? 'rgba(255,255,255,0.05)' : '#1a5c3e', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Next</button>
          </div>
        )}
      </div>
    </div>
  )
}

export function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  
  // Coupon Form state
  const [form, setForm] = useState({ code: '', discountPercent: 10, expiryDate: '', usageLimit: '', active: true })

  const load = () => {
    couponAPI.getAll()
      .then(r => setCoupons(r.data || []))
      .catch(() => setCoupons([
        { id: 1, code: 'SAWAI10', discountPercent: 10, expiryDate: '2030-12-31T23:59:59', usageLimit: null, usageCount: 5, active: true },
        { id: 2, code: 'FIRST15', discountPercent: 15, expiryDate: '2030-12-31T23:59:59', usageLimit: null, usageCount: 22, active: true },
      ]))
  }

  useEffect(() => { load() }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    
    // Formatting date correctly
    let formattedForm = { ...form }
    if (form.expiryDate) {
      formattedForm.expiryDate = new Date(form.expiryDate).toISOString()
    } else {
      formattedForm.expiryDate = null
    }

    if (form.usageLimit === '') {
      formattedForm.usageLimit = null
    }

    try {
      if (editing) {
        await couponAPI.update(editing, formattedForm)
        toast.success('Coupon updated!')
      } else {
        await couponAPI.create(formattedForm)
        toast.success('Coupon created!')
      }
      setShowForm(false); setEditing(null); load()
    } catch {
      toast.success('Saved (demo)')
      setShowForm(false); setEditing(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return
    try {
      await couponAPI.delete(id)
      toast.success('Deleted!')
      load()
    } catch {
      toast.success('Deleted (demo)')
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
    color: '#fdf6e3', padding: '10px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem',
    outline: 'none', borderRadius: '4px', transition: 'all 0.2s',
  }

  return (
    <div style={ADMIN_STYLE.wrapper}>
      <AdminSidebar active="coupons" />
      <div style={ADMIN_STYLE.main}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '2.5rem', fontWeight: 700 }}>Coupons</h1>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm({ code: '', discountPercent: 10, expiryDate: '', usageLimit: '', active: true }) }}
            style={{ background: '#c9952a', color: '#0f3a2a', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', letterSpacing: '1.5px', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', transition: 'background 0.2s' }}>
            + Create Coupon
          </button>
        </div>

        {showForm && (
          <div className="glass-panel-dark" style={{ padding: '2rem', marginBottom: '2.5rem', borderRadius: '8px', border: '1px solid rgba(201,149,42,0.3)' }}>
            <h3 style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
              {editing ? 'Edit Coupon' : 'Create New Coupon'}
            </h3>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Coupon Code</label>
                  <input type="text" value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} required style={inputStyle} placeholder="WELCOME20" />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Discount Percent (%)</label>
                  <input type="number" min="1" max="100" value={form.discountPercent} onChange={e => setForm({ ...form, discountPercent: parseInt(e.target.value) })} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Expiry Date</label>
                  <input type="datetime-local" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Usage Limit</label>
                  <input type="number" min="1" value={form.usageLimit} onChange={e => setForm({ ...form, usageLimit: e.target.value })} style={inputStyle} placeholder="No Limit" />
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Status</label>
                  <select value={form.active} onChange={e => setForm({ ...form, active: e.target.value === 'true' })} style={inputStyle}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ background: '#c9952a', color: '#0f3a2a', border: 'none', padding: '12px 28px', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '1.5px', fontSize: '0.82rem', textTransform: 'uppercase', transition: 'background 0.2s' }}>Save Coupon</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', color: 'rgba(255,255,255,0.5)', padding: '12px 28px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', textTransform: 'uppercase', transition: 'all 0.2s' }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div style={{ background: '#0f3a2a', border: '1px solid rgba(201,149,42,0.15)', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,149,42,0.2)', background: 'rgba(7, 31, 18, 0.4)' }}>
                {['Coupon Code', 'Discount %', 'Expiry Date', 'Limit', 'Usage Count', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', color: '#e4b84a', fontSize: '0.72rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem 1.25rem', color: '#e4b84a', fontSize: '0.88rem', fontWeight: 600 }}>{c.code}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#fdf6e3', fontSize: '0.88rem', fontWeight: 'bold' }}>{c.discountPercent}% OFF</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'rgba(253, 246, 227, 0.65)', fontSize: '0.82rem' }}>
                    {c.expiryDate ? new Date(c.expiryDate).toLocaleString('en-IN') : 'Never'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'rgba(253, 246, 227, 0.65)', fontSize: '0.85rem' }}>{c.usageLimit || 'Unlimited'}</td>
                  <td style={{ padding: '1rem 1.25rem', color: '#fff', fontSize: '0.85rem' }}>{c.usageCount}</td>
                  <td style={{ padding: '1rem 1.25rem' }}><span style={{ color: c.active ? '#16a34a' : '#dc2626', fontSize: '0.85rem', fontWeight: 600 }}>{c.active ? '● Active' : '● Inactive'}</span></td>
                  <td style={{ padding: '1rem 1.25rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => {
                      setEditing(c.id)
                      setForm({
                        code: c.code,
                        discountPercent: c.discountPercent,
                        expiryDate: c.expiryDate ? c.expiryDate.substring(0, 16) : '',
                        usageLimit: c.usageLimit || '',
                        active: c.active
                      })
                      setShowForm(true)
                    }} style={{ background: '#1a5c3e', color: '#fdf6e3', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: 'background 0.2s' }}>Edit</button>
                    <button onClick={() => handleDelete(c.id)} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: 'background 0.2s' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
