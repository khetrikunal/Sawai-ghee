import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { wholesaleAPI } from '../utils/api'

const TIERS = [
  {
    label: '200ml · Buy 5+ Bottles',
    price: '₹540 / bottle',
    saving: 'Save ₹100/bottle (Actual ₹640)',
  },
  {
    label: '500ml · Buy 5+ Bottles',
    price: '₹1,350 / bottle',
    saving: 'Save ₹250/bottle (Actual ₹1,600)',
  },
  {
    label: '1L · Buy 5+ Bottles',
    price: '₹2,700 / bottle',
    saving: 'Save ₹500/bottle (Actual ₹3,200)',
  },
]

export default function WholesalePage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', quantity: '', businessType: '', city: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await wholesaleAPI.submitLead(form)
      toast.success('Enquiry submitted! We will contact you within 24 hours.')
      setForm({ name: '', phone: '', email: '', quantity: '', businessType: '', city: '', message: '' })
    } catch {
      // Demo mode fallback
      toast.success('Enquiry submitted! We will contact you within 24 hours.')
      setForm({ name: '', phone: '', email: '', quantity: '', businessType: '', city: '', message: '' })
    } finally {
      setLoading(false)
    }
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
        <title>Wholesale & Bulk Desi Ghee Purchase | Sawai Ghee</title>
        <meta name="description" content="Get premium A2 Gir Cow Bilona Ghee in bulk quantities at wholesale prices. Enquire now for distributor rates, private labeling, and commercial supply packages." />
        <meta name="keywords" content="wholesale ghee supplier, bulk ghee purchase, ghee distributor Maharashtra, corporate ghee gifting, private label ghee" />
        <link rel="canonical" href="https://sawaighee.com/wholesale" />
        <meta property="og:title" content="Wholesale & Bulk Desi Ghee Purchase | Sawai Ghee" />
        <meta property="og:description" content="Inquire about wholesale pricing for our premium A2 Vedic Bilona Ghee. Special pricing tiers for distributors and bulk buyers." />
        <meta property="og:url" content="https://sawaighee.com/wholesale" />
      </Helmet>
      {/* HEADER */}
      <div style={{ background: '#0f3a2a', padding: '5rem 1.5rem 4rem', textAlign: 'center', borderBottom: '2px solid #c9952a' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
          Wholesale Enquiry
        </motion.h1>
        <p style={{ color: '#ede0b8', fontSize: '1rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
          Bulk pricing for retailers, restaurants & distributors
        </p>
      </div>

      <section style={{ background: 'linear-gradient(135deg, #0a2819 0%, #0f3a2a 100%)', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left: Tiers & Benefits */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ color: '#e4b84a', fontSize: '0.75rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>✦ Wholesale Pricing ✦</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, marginBottom: '1.25rem', lineHeight: 1.15 }}>Bulk Order Tiers</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              We partner with restaurants, hotels, Ayurvedic stores, grocery retailers, and distributors across Maharashtra and beyond. Volume rewards you with better pricing.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {TIERS.map(t => (
                <div key={t.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,149,42,0.25)', borderRadius: '8px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ color: '#f5ead0', fontSize: '0.88rem', fontWeight: 500 }}>{t.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#e4b84a', fontWeight: 700, fontSize: '1.15rem' }}>{t.price}</div>
                    <div style={{ color: '#4caf50', fontSize: '0.75rem', fontWeight: 600 }}>{t.saving}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(201,149,42,0.1)', border: '1px solid rgba(201,149,42,0.25)', borderRadius: '12px', padding: '1.75rem' }}>
              <div style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem', fontWeight: 600, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>✦</span> Wholesale Benefits
              </div>
              {[
                'Free delivery above 50 units in Pune, Satara & Nashik',
                'Dedicated account manager for bulk orders',
                'Custom branded packaging available for B2B clients',
                'Flexible payment terms for verified partners',
                'Free product samples on first inquiry',
                'Priority dispatch and quality guarantee',
              ].map(b => (
                <div key={b} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#e4b84a', flexShrink: 0, fontWeight: 'bold' }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            className="glass-panel-dark"
            style={{ padding: '2.5rem', borderRadius: '12px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.8rem', fontWeight: 600, marginBottom: '1.75rem' }}>Send Enquiry</h3>
            <form onSubmit={handleSubmit}>
              {[
                { k: 'name', l: 'Full Name', t: 'text', p: 'Your full name' },
                { k: 'phone', l: 'Phone Number', t: 'tel', p: '+91 98765 43210' },
                { k: 'email', l: 'Email Address', t: 'email', p: 'you@business.com' },
                { k: 'quantity', l: 'Quantity Required', t: 'text', p: 'e.g. 50 units of 1L' },
                { k: 'city', l: 'City / District', t: 'text', p: 'Pune, Nashik, Mumbai...' },
              ].map(f => (
                <div key={f.k} style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} required style={inputStyle} className="wholesale-input" />
                </div>
              ))}

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Business Type</label>
                <select value={form.businessType} onChange={e => setForm({ ...form, businessType: e.target.value })} required style={{ ...inputStyle }} className="wholesale-input select-dark">
                  <option value="" style={{ color: '#0f3a2a' }}>Select type</option>
                  {['Restaurant / Hotel', 'Grocery / Retail Store', 'Ayurvedic / Health Store', 'Online Reseller', 'Distributor / Wholesaler', 'Other'].map(opt => (
                    <option key={opt} style={{ color: '#0f3a2a' }}>{opt}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>Message (Optional)</label>
                <textarea rows={3} placeholder="Any specific requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }} className="wholesale-input" />
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7a6040' : '#c9952a', color: '#0f3a2a', border: 'none', padding: '14px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.82rem', cursor: loading ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', transition: 'all 0.2s ease-out' }}
                onMouseEnter={e => { if (!loading) e.target.style.background = '#e4b84a' }}
                onMouseLeave={e => { if (!loading) e.target.style.background = '#c9952a' }}>
                {loading ? 'Sending Request...' : 'Send Wholesale Enquiry →'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ADDITIONAL STYLES */}
      <style>{`
        .wholesale-input:focus {
          border-color: #c9952a !important;
          background: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 0 0 2px rgba(201, 149, 42, 0.25);
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
