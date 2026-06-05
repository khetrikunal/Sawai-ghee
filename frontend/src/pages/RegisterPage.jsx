import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store'
import { authAPI } from '../utils/api'
import GheeJar from '../components/GheeJar'

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
  color: '#fdf6e3', padding: '11px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', outline: 'none',
  borderRadius: '4px', transition: 'all 0.2s',
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore(s => s.setAuth)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match')
    setLoading(true)
    try {
      const { data } = await authAPI.register({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      setAuth(data.data.user, data.data.token)
      toast.success(`Account created! Welcome, ${data.data.user.name}!`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #071f12, #0f3a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/"><GheeJar size={80} /></Link>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '1.65rem', marginTop: '0.75rem', fontWeight: 600 }}>Sawai Gir Amrut Ghee</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '0.25rem', fontFamily: "'DM Sans', sans-serif" }}>A Brand by Vithoba Ventures</div>
        </div>
        <div className="glass-panel-dark" style={{ padding: '2.5rem', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '2.2rem', marginBottom: '0.35rem', fontWeight: 600 }}>Create Account</h2>
          <p style={{ color: 'rgba(253, 246, 227, 0.6)', fontSize: '0.85rem', marginBottom: '2rem', fontFamily: "'DM Sans', sans-serif" }}>Join the Sawai family today</p>
          <form onSubmit={handleSubmit}>
            {[
              { k: 'name', l: 'Full Name', t: 'text', p: 'Your full name' },
              { k: 'email', l: 'Email Address', t: 'email', p: 'you@example.com' },
              { k: 'phone', l: 'Phone Number', t: 'tel', p: '+91 98765 43210' },
              { k: 'password', l: 'Password', t: 'password', p: 'Min 8 characters' },
              { k: 'confirmPassword', l: 'Confirm Password', t: 'password', p: 'Repeat password' },
            ].map(f => (
              <div key={f.k} style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>{f.l}</label>
                <input
                  type={f.t}
                  placeholder={f.p}
                  value={form[f.k]}
                  onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                  required
                  minLength={f.k === 'password' ? 8 : undefined}
                  style={inputStyle}
                  onFocus={e => {
                    e.target.style.borderColor = '#c9952a';
                    e.target.style.boxShadow = '0 0 0 3px rgba(201, 149, 42, 0.2)';
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                  }}
                />
              </div>
            ))}
            <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7a6040' : '#c9952a', color: '#0f3a2a', border: 'none', padding: '13px', borderRadius: '4px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', marginTop: '0.75rem', transition: 'background 0.2s' }}
              onMouseEnter={(e) => { if (!loading) e.target.style.background = '#e4b84a' }}
              onMouseLeave={(e) => { if (!loading) e.target.style.background = '#c9952a' }}>
              {loading ? 'Creating...' : 'Create Account →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '1.75rem', fontFamily: "'DM Sans', sans-serif" }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#e4b84a', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}