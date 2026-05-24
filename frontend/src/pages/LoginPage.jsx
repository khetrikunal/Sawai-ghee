import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store'
import { authAPI } from '../utils/api'
import GheeJar from '../components/GheeJar'

function AuthLayout({ title, subtitle, children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #071f12, #0f3a2a)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/"><GheeJar size={80} /></Link>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '1.5rem', marginTop: '0.75rem' }}>Sawai Gir Amrut Ghee</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '0.25rem' }}>A Brand by Vithoba Ventures</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(201,149,42,0.25)', padding: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '2rem', marginBottom: '0.35rem' }}>{title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginBottom: '2rem' }}>{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
  color: '#fdf6e3', padding: '11px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', outline: 'none',
}

export function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore(s => s.setAuth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authAPI.login(form)
      setAuth(data.data.user, data.data.token)
      toast.success(`Welcome back, ${data.data.user.name}!`)
      navigate(data.data.user.role === 'ADMIN' ? '/admin' : '/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your Sawai account">
      <form onSubmit={handleSubmit}>
        {[
          { k: 'email', l: 'Email Address', t: 'email', p: 'you@example.com' },
          { k: 'password', l: 'Password', t: 'password', p: '••••••••' },
        ].map(f => (
          <div key={f.k} style={{ marginBottom: '1.1rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{f.l}</label>
            <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} required style={inputStyle} />
          </div>
        ))}
        <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7a6040' : '#c9952a', color: '#0f3a2a', border: 'none', padding: '13px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif', textTransform: 'uppercase", marginTop: '0.5rem' }}>
          {loading ? 'Signing In...' : 'Sign In →'}
        </button>
      </form>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '1.5rem' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color: '#e4b84a', textDecoration: 'none' }}>Create one</Link>
      </p>
    </AuthLayout>
  )
}

export function RegisterPage() {
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
      setAuth(data.user, data.token)
      toast.success(`Account created! Welcome, ${data.user.name}!`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Create Account" subtitle="Join the Sawai family today">
      <form onSubmit={handleSubmit}>
        {[
          { k: 'name', l: 'Full Name', t: 'text', p: 'Your full name' },
          { k: 'email', l: 'Email Address', t: 'email', p: 'you@example.com' },
          { k: 'phone', l: 'Phone Number', t: 'tel', p: '+91 98765 43210' },
          { k: 'password', l: 'Password', t: 'password', p: 'Min 8 characters' },
          { k: 'confirmPassword', l: 'Confirm Password', t: 'password', p: 'Repeat password' },
        ].map(f => (
          <div key={f.k} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{f.l}</label>
            <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} required minLength={f.k === 'password' ? 8 : undefined} style={inputStyle} />
          </div>
        ))}
        <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7a6040' : '#c9952a', color: '#0f3a2a', border: 'none', padding: '13px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', marginTop: '0.5rem' }}>
          {loading ? 'Creating...' : 'Create Account →'}
        </button>
      </form>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '1.5rem' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#e4b84a', textDecoration: 'none' }}>Sign in</Link>
      </p>
    </AuthLayout>
  )
}

export default LoginPage
