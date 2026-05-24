import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store'
import { orderAPI, productAPI, wholesaleAPI } from '../../utils/api'
import toast from 'react-hot-toast'

const ADMIN_STYLE = {
  wrapper: { display: 'flex', minHeight: '100vh', background: '#0a1a10', fontFamily: "'DM Sans', sans-serif" },
  sidebar: { width: 240, background: '#071f12', borderRight: '1px solid rgba(201,149,42,0.2)', padding: '2rem 0', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' },
  main: { flex: 1, padding: '2rem', overflowX: 'hidden' },
}

function AdminSidebar({ active }) {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const links = [
    { to: '/admin', label: '📊 Dashboard', key: 'dashboard' },
    { to: '/admin/products', label: '🫙 Products', key: 'products' },
    { to: '/admin/orders', label: '📦 Orders', key: 'orders' },
    { to: '/', label: '🌐 View Site', key: 'site' },
  ]
  return (
    <div style={ADMIN_STYLE.sidebar}>
      <div style={{ padding: '0 1.5rem 2rem', borderBottom: '1px solid rgba(201,149,42,0.15)' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '1.2rem' }}>🪷 Sawai Admin</div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', letterSpacing: '1px', marginTop: '0.2rem' }}>CONTROL PANEL</div>
      </div>
      <nav style={{ padding: '1rem 0' }}>
        {links.map(l => (
          <Link key={l.key} to={l.to} style={{
            display: 'block', padding: '0.85rem 1.5rem', color: active === l.key ? '#e4b84a' : 'rgba(255,255,255,0.55)',
            textDecoration: 'none', fontSize: '0.85rem', background: active === l.key ? 'rgba(201,149,42,0.1)' : 'transparent',
            borderLeft: active === l.key ? '3px solid #c9952a' : '3px solid transparent', transition: 'all 0.2s',
          }}>{l.label}</Link>
        ))}
        <button onClick={() => { logout(); navigate('/') }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '0.85rem 1.5rem', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', fontSize: '0.85rem', cursor: 'pointer', borderLeft: '3px solid transparent' }}>
          🚪 Logout
        </button>
      </nav>
    </div>
  )
}

export function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0, leads: 0 })

  useEffect(() => {
    Promise.allSettled([orderAPI.getAll(), productAPI.getAll(), wholesaleAPI.getAllLeads()])
      .then(([orders, products, leads]) => {
        const o = orders.value?.data || []
        setStats({
          orders: o.length,
          revenue: o.reduce((s, x) => s + (x.total || 0), 0),
          products: products.value?.data?.length || 3,
          leads: leads.value?.data?.length || 0,
        })
      })
  }, [])

  const cards = [
    { label: 'Total Orders', value: stats.orders, icon: '📦', color: '#1a5c3e' },
    { label: 'Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: '💰', color: '#c9952a' },
    { label: 'Products', value: stats.products, icon: '🫙', color: '#2d7a55' },
    { label: 'Wholesale Leads', value: stats.leads, icon: '🤝', color: '#0f3a2a' },
  ]

  return (
    <div style={ADMIN_STYLE.wrapper}>
      <AdminSidebar active="dashboard" />
      <div style={ADMIN_STYLE.main}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '2rem', marginBottom: '2rem' }}>Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {cards.map(c => (
            <div key={c.label} style={{ background: c.color, padding: '1.5rem', borderLeft: '3px solid #c9952a' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{c.label}</div>
              <div style={{ color: '#fff', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, marginTop: '0.25rem' }}>{c.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f3a2a', padding: '1.5rem', border: '1px solid rgba(201,149,42,0.2)' }}>
          <h3 style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', marginBottom: '1rem' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[['📦 View Orders', '/admin/orders'], ['🫙 Manage Products', '/admin/products']].map(([l, to]) => (
              <Link key={to} to={to} style={{ background: '#c9952a', color: '#0f3a2a', padding: '10px 20px', textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px' }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AdminProducts() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', size: '', price: '', originalPrice: '', discount: '', stock: '', badge: '', active: true })
  const [showForm, setShowForm] = useState(false)

  const load = () => productAPI.getAll().then(r => setProducts(r.data)).catch(() => setProducts([
    { id: 1, name: 'Sawai Gir Amrut Ghee', size: '500 ml', price: 699, originalPrice: 849, discount: 18, stock: 50, badge: 'BESTSELLER', active: true },
    { id: 2, name: 'Sawai Gir Amrut Ghee', size: '1 Litre', price: 1299, originalPrice: 1549, discount: 16, stock: 30, badge: 'POPULAR', active: true },
    { id: 3, name: 'Sawai Gir Amrut Ghee', size: '5 Litre', price: 5799, originalPrice: 7200, discount: 19, stock: 15, badge: 'BEST VALUE', active: true },
  ]))

  useEffect(() => { load() }, [])

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

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fdf6e3', padding: '9px 12px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', outline: 'none' }

  return (
    <div style={ADMIN_STYLE.wrapper}>
      <AdminSidebar active="products" />
      <div style={ADMIN_STYLE.main}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '2rem' }}>Products</h1>
          <button onClick={() => { setShowForm(true); setEditing(null); setForm({ name: 'Sawai Gir Amrut Ghee', size: '', price: '', originalPrice: '', discount: '', stock: '', badge: '', active: true }) }}
            style={{ background: '#c9952a', color: '#0f3a2a', border: 'none', padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem', letterSpacing: '1px', fontFamily: "'DM Sans', sans-serif" }}>
            + Add Product
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#0f3a2a', border: '1px solid rgba(201,149,42,0.3)', padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', marginBottom: '1.5rem' }}>
              {editing ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
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
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 5 }}>{f.l}</label>
                    <input type={f.t} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} required={['name', 'size', 'price', 'stock'].includes(f.k)} style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ background: '#c9952a', color: '#0f3a2a', border: 'none', padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '1px', fontSize: '0.82rem' }}>Save Product</button>
                <button type="button" onClick={() => setShowForm(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', padding: '10px 24px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem' }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div style={{ background: '#0f3a2a', border: '1px solid rgba(201,149,42,0.15)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,149,42,0.2)' }}>
                {['Product', 'Size', 'Price', 'Stock', 'Badge', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.85rem 1rem', textAlign: 'left', color: '#e4b84a', fontSize: '0.72rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: '#fdf6e3', fontSize: '0.85rem' }}>{p.name}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>{p.size}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#c9952a', fontWeight: 700, fontSize: '0.88rem' }}>₹{p.price?.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 1rem', color: p.stock < 10 ? '#f44336' : 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>{p.stock}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>{p.badge && <span style={{ background: '#c9952a', color: '#0f3a2a', fontSize: '0.65rem', padding: '2px 8px', fontWeight: 700 }}>{p.badge}</span>}</td>
                  <td style={{ padding: '0.85rem 1rem' }}><span style={{ color: p.active ? '#4caf50' : '#f44336', fontSize: '0.78rem' }}>{p.active ? '● Active' : '● Inactive'}</span></td>
                  <td style={{ padding: '0.85rem 1rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => { setEditing(p.id); setForm({ ...p }); setShowForm(true) }} style={{ background: '#1a5c3e', color: '#fdf6e3', border: 'none', padding: '5px 12px', cursor: 'pointer', fontSize: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} style={{ background: '#c62828', color: '#fff', border: 'none', padding: '5px 12px', cursor: 'pointer', fontSize: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
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

export function AdminOrders() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    orderAPI.getAll().then(r => setOrders(r.data)).catch(() => setOrders([
      { id: 'SWI001', customerName: 'Priya Sharma', total: 1299, status: 'DELIVERED', createdAt: '2025-05-01', items: [{ size: '1L', qty: 1 }] },
      { id: 'SWI002', customerName: 'Ramesh Patil', total: 5799, status: 'PROCESSING', createdAt: '2025-05-03', items: [{ size: '5L', qty: 1 }] },
      { id: 'SWI003', customerName: 'Suresh Mehta', total: 2598, status: 'SHIPPED', createdAt: '2025-05-04', items: [{ size: '1L', qty: 2 }] },
    ]))
  }, [])

  const STATUS_COLORS = { PENDING: '#f5a623', PROCESSING: '#2196f3', SHIPPED: '#9c27b0', DELIVERED: '#4caf50', CANCELLED: '#f44336' }

  const updateStatus = async (id, status) => {
    try { await orderAPI.updateStatus(id, status); toast.success('Status updated!') } catch { toast.success('Updated (demo)') }
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  return (
    <div style={ADMIN_STYLE.wrapper}>
      <AdminSidebar active="orders" />
      <div style={ADMIN_STYLE.main}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '2rem', marginBottom: '2rem' }}>Orders</h1>
        <div style={{ background: '#0f3a2a', border: '1px solid rgba(201,149,42,0.15)', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(201,149,42,0.2)' }}>
                {['Order ID', 'Customer', 'Total', 'Date', 'Status', 'Update Status'].map(h => (
                  <th key={h} style={{ padding: '0.85rem 1rem', textAlign: 'left', color: '#e4b84a', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: '#e4b84a', fontSize: '0.82rem', fontFamily: 'monospace' }}>{o.id}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fdf6e3', fontSize: '0.85rem' }}>{o.customerName || o.user?.name || 'Guest'}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#c9952a', fontWeight: 700, fontSize: '0.88rem' }}>₹{o.total?.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ background: STATUS_COLORS[o.status] || '#666', color: '#fff', fontSize: '0.7rem', padding: '3px 10px', fontWeight: 700, borderRadius: 2 }}>{o.status}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}
                      style={{ background: '#1a5c3e', color: '#fdf6e3', border: '1px solid rgba(201,149,42,0.3)', padding: '5px 10px', fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", outline: 'none' }}>
                      {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => <option key={s}>{s}</option>)}
                    </select>
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
