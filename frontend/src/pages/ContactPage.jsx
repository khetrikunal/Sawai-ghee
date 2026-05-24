import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Message sent! We will get back to you within 24 hours.')
      setForm({ name: '', email: '', phone: '', message: '' })
      setLoading(false)
    }, 800)
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
    color: '#fdf6e3', padding: '10px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', outline: 'none',
  }

  const DETAILS = [
    { icon: '📞', title: 'Customer Care', text: '9130643003', sub: 'Mon–Sat · 9 AM – 7 PM', href: 'tel:9130643003' },
    { icon: '📍', title: 'Farm Address', text: 'At: Malwadi, Post: Bibi, Tal: Phaltan', sub: 'Dist: Satara – 415537, Maharashtra' },
    { icon: '🏢', title: 'Marketed By', text: 'Vithoba Ventures Group of Companies', sub: 'Maharashtra, India' },
    { icon: '💬', title: 'WhatsApp', text: 'Chat with us', sub: 'Quick responses guaranteed', href: 'https://wa.me/919130643003' },
  ]

  return (
    <div>
      <div style={{ background: '#0f3a2a', padding: '4rem 1.5rem 3rem', textAlign: 'center', borderBottom: '2px solid #c9952a' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>
          Contact Us
        </motion.h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>We'd love to hear from you</p>
      </div>

      <section style={{ background: '#0f3a2a', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ color: '#e4b84a', fontSize: '0.68rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>✦ Get in Touch ✦</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', marginBottom: '1rem' }}>We're Here to Help</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              Whether you have questions about our products, want to place a wholesale order, or just want to know more about the Bilona process — reach out to us anytime.
            </p>
            {DETAILS.map((d) => (
              <div key={d.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div style={{ width: 46, height: 46, background: 'rgba(201,149,42,0.15)', border: '1px solid rgba(201,149,42,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{d.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.05rem', marginBottom: '0.2rem' }}>{d.title}</div>
                  {d.href
                    ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ color: '#e4b84a', fontSize: '0.88rem', textDecoration: 'none' }}>{d.text}</a>
                    : <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>{d.text}</div>}
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', marginTop: '0.15rem' }}>{d.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,149,42,0.2)', padding: '2rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.6rem', marginBottom: '1.75rem' }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              {[
                { k: 'name', l: 'Your Name', t: 'text', p: 'Full name' },
                { k: 'email', l: 'Email Address', t: 'email', p: 'you@example.com' },
                { k: 'phone', l: 'Phone (Optional)', t: 'tel', p: '+91 98765 43210' },
              ].map(f => (
                <div key={f.k} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                    required={f.k !== 'phone'} style={inputStyle} />
                </div>
              ))}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Message</label>
                <textarea rows={5} placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  required style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7a6040' : '#c9952a', color: '#0f3a2a', border: 'none', padding: '14px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.82rem', cursor: loading ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase' }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </motion.div>
        </div>
        <style>{`@media(max-width:900px){ section > div { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </div>
  )
}
