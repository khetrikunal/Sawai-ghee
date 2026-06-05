import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'

const DETAILS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: 'Customer Care',
    text: '+91 91306 43003',
    sub: 'Mon–Sat · 9 AM – 7 PM',
    href: 'tel:9130643003'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: 'Farm Address',
    text: 'At: Malwadi, Post: Bibi, Tal: Phaltan',
    sub: 'Dist: Satara – 415537, Maharashtra'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M8 10h.01" />
        <path d="M16 10h.01" />
        <path d="M8 14h.01" />
        <path d="M16 14h.01" />
      </svg>
    ),
    title: 'Marketed By',
    text: 'Vithoba Ventures Group of Companies',
    sub: 'Maharashtra, India'
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'WhatsApp Support',
    text: 'Chat with us',
    sub: 'Quick responses guaranteed',
    href: 'https://wa.me/919130643003'
  },
]

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
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '4px',
    color: '#fdf6e3',
    padding: '11px 14px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'all 0.2s ease-out',
  }

  return (
    <div style={{ backgroundColor: 'var(--green-dark)' }}>
      <Helmet>
        <title>Contact Us | Sawai Gir Amrut Ghee Support</title>
        <meta name="description" content="Contact Sawai Ghee customer support. Call us at +91 91306 43003, email us, or visit our desi Gir cow farm in Phaltan, Satara, Maharashtra." />
        <meta name="keywords" content="contact Sawai ghee, ghee farm address Satara, Sawai ghee contact number, support Vithoba Ventures" />
        <link rel="canonical" href="https://sawaighee.com/contact" />
        <meta property="og:title" content="Contact Us | Sawai Gir Amrut Ghee Support" />
        <meta property="og:description" content="Reach out to Sawai Gir Amrut Ghee support. Find farm details and business contacts." />
        <meta property="og:url" content="https://sawaighee.com/contact" />
      </Helmet>
      {/* HEADER */}
      <div style={{ background: '#0f3a2a', padding: '5rem 1.5rem 4rem', textAlign: 'center', borderBottom: '2px solid #c9952a' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
          Contact Us
        </motion.h1>
        <p style={{ color: '#ede0b8', fontSize: '1rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>We'd love to hear from you</p>
      </div>

      <section style={{ background: 'linear-gradient(135deg, #0a2819 0%, #0f3a2a 100%)', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '5rem', alignItems: 'start' }}>
          
          {/* LEFT INFO DETAILS */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ color: '#e4b84a', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>✦ Get in Touch ✦</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, marginBottom: '1.25rem', lineHeight: 1.15 }}>We're Here to Help</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Whether you have questions about our products, want to place a wholesale order, or just want to know more about the Bilona process — reach out to us anytime.
            </p>
            
            {DETAILS.map((d) => (
              <div key={d.title} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '8px', background: 'rgba(201,149,42,0.15)', border: '1px solid rgba(201,149,42,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {d.icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.2rem' }}>{d.title}</div>
                  {d.href
                    ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact-link" style={{ color: '#e4b84a', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.2s' }}>{d.text}</a>
                    : <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{d.text}</div>}
                  <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', marginTop: '0.15rem' }}>{d.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* RIGHT MESSAGE FORM */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            className="glass-panel-dark"
            style={{ padding: '2.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.75rem' }}>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              {[
                { k: 'name', l: 'Your Name', t: 'text', p: 'Enter your full name' },
                { k: 'email', l: 'Email Address', t: 'email', p: 'you@example.com' },
                { k: 'phone', l: 'Phone (Optional)', t: 'tel', p: 'Enter your phone number' },
              ].map(f => (
                <div key={f.k} style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                    required={f.k !== 'phone'} style={inputStyle} className="contact-input" />
                </div>
              ))}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Message</label>
                <textarea rows={4} placeholder="Write your message here..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  required style={{ ...inputStyle, resize: 'vertical' }} className="contact-input" />
              </div>
              <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7a6040' : '#c9952a', color: '#0f3a2a', border: 'none', padding: '14px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.82rem', cursor: loading ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', transition: 'all 0.2s ease-out' }}
                onMouseEnter={e => { if (!loading) e.target.style.background = '#e4b84a' }}
                onMouseLeave={e => { if (!loading) e.target.style.background = '#c9952a' }}>
                {loading ? 'Sending Message...' : 'Send Message →'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ADDITIONAL STYLES */}
      <style>{`
        .contact-input:focus {
          border-color: #c9952a !important;
          background: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 0 0 2px rgba(201, 149, 42, 0.25);
        }
        .contact-link:hover {
          color: #fdf6e3 !important;
          text-decoration: underline !important;
        }
        @media(max-width:900px){
          section > div {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </div>
  )
}
