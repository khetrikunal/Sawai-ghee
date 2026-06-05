import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../utils/api'
import { useAuthStore } from '../store'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, token, setAuth } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  })

  useEffect(() => {
    if (!token) navigate('/login')
  }, [token, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authAPI.updateProfile(form)
      const updatedUser = data?.data || data
      setAuth({ ...user, ...updatedUser }, token)
      toast.success('Profile updated successfully')
    } catch {
      toast.error('Could not update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!token) return null

  const inputStyle = {
    width: '100%', border: '1px solid #ede0b8', padding: '10px 14px',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', outline: 'none',
    background: '#fdf6e3', color: '#1a1208', transition: 'all 0.2s',
    borderRadius: '4px',
  }

  return (
    <div style={{ background: '#f5ead0', minHeight: '80vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', color: '#0f3a2a', marginBottom: '0.5rem', fontWeight: 700 }}>My Profile</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Manage your account information
        </p>

        <div style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '8px', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#0f3a2a', marginBottom: '1.5rem', borderBottom: '1px solid #ede0b8', paddingBottom: '0.75rem', fontWeight: 600 }}>
            Account Details
          </h3>

          {/* Read-only fields */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820', marginBottom: 6, fontWeight: 600 }}>Email (cannot be changed)</label>
            <div style={{ ...inputStyle, background: '#eee5d0', color: '#7a6b55', cursor: 'not-allowed' }}>{user?.email}</div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820', marginBottom: 6, fontWeight: 600 }}>Role</label>
            <span style={{ background: user?.role === 'ADMIN' ? 'rgba(15, 58, 42, 0.15)' : 'rgba(201, 149, 42, 0.15)', color: user?.role === 'ADMIN' ? '#0f3a2a' : '#c9952a', padding: '4px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
              {user?.role}
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820', marginBottom: 6, fontWeight: 600 }}>Full Name</label>
              <input
                type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                required style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#c9952a'; e.target.style.boxShadow = '0 0 0 3px rgba(201, 149, 42, 0.15)' }}
                onBlur={e => { e.target.style.borderColor = '#ede0b8'; e.target.style.boxShadow = 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820', marginBottom: 6, fontWeight: 600 }}>Phone Number</label>
              <input
                type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = '#c9952a'; e.target.style.boxShadow = '0 0 0 3px rgba(201, 149, 42, 0.15)' }}
                onBlur={e => { e.target.style.borderColor = '#ede0b8'; e.target.style.boxShadow = 'none' }}
              />
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '14px', background: loading ? '#7a6040' : '#0f3a2a',
              color: '#e4b84a', border: 'none', fontWeight: 700, letterSpacing: '1px',
              fontSize: '0.85rem', cursor: loading ? 'default' : 'pointer', borderRadius: '4px',
              fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', transition: 'background 0.2s'
            }}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Quick links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Link to="/my-orders" style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '8px', padding: '1.25rem', textDecoration: 'none', textAlign: 'center', transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px rgba(0,0,0,0.02)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f3a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: '#0f3a2a', fontSize: '0.9rem' }}>My Orders</p>
          </Link>
          <Link to="/products" style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '8px', padding: '1.25rem', textDecoration: 'none', textAlign: 'center', transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px rgba(0,0,0,0.02)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f3a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: '#0f3a2a', fontSize: '0.9rem' }}>Shop More</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
