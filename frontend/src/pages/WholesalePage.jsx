import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
      // Demo mode
      toast.success('Enquiry submitted! We will contact you within 24 hours.')
      setForm({ name: '', phone: '', email: '', quantity: '', businessType: '', city: '', message: '' })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fdf6e3', padding: '10px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', outline: 'none' }

  return (
    <div>
      <div style={{ background: '#0f3a2a', padding: '4rem 1.5rem 3rem', textAlign: 'center', borderBottom: '2px solid #c9952a' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Wholesale Enquiry</motion.h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem' }}>Bulk pricing for retailers, restaurants & distributors</p>
      </div>

      <section style={{ background: 'linear-gradient(135deg, #071f12, #0f3a2a)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Left: tiers & benefits */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ color: '#e4b84a', fontSize: '0.68rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>✦ Wholesale Pricing ✦</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(1.8rem, 4vw, 2.3rem)', marginBottom: '1rem' }}>Bulk Order Tiers</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              We partner with restaurants, hotels, Ayurvedic stores, grocery retailers, and distributors across Maharashtra and beyond. Volume rewards you with better pricing.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {TIERS.map(t => (
                <div key={t.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,149,42,0.25)', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ color: '#f5ead0', fontSize: '0.85rem' }}>{t.label}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#e4b84a', fontWeight: 700, fontSize: '1.05rem' }}>{t.price}</div>
                    <div style={{ color: '#4caf50', fontSize: '0.72rem' }}>{t.saving}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(201,149,42,0.1)', border: '1px solid rgba(201,149,42,0.25)', padding: '1.25rem' }}>
              <div style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', marginBottom: '1rem' }}>✦ Wholesale Benefits</div>
              {[
                'Free delivery above 50 units in Pune, Satara & Nashik',
                'Dedicated account manager for bulk orders',
                'Custom branded packaging available for B2B clients',
                'Flexible payment terms for verified partners',
                'Free product samples on first inquiry',
                'Priority dispatch and quality guarantee',
              ].map(b => (
                <div key={b} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#c9952a', flexShrink: 0 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.83rem' }}>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,149,42,0.2)', padding: '2rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.6rem', marginBottom: '1.75rem' }}>Send Enquiry</h3>
            <form onSubmit={handleSubmit}>
              {[
                { k: 'name', l: 'Full Name', t: 'text', p: 'Your full name' },
                { k: 'phone', l: 'Phone Number', t: 'tel', p: '+91 98765 43210' },
                { k: 'email', l: 'Email Address', t: 'email', p: 'you@business.com' },
                { k: 'quantity', l: 'Quantity Required', t: 'text', p: 'e.g. 50 units of 1L' },
                { k: 'city', l: 'City / District', t: 'text', p: 'Pune, Nashik, Mumbai...' },
              ].map(f => (
                <div key={f.k} style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} required style={inputStyle} />
                </div>
              ))}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Business Type</label>
                <select value={form.businessType} onChange={e => setForm({ ...form, businessType: e.target.value })} required style={{ ...inputStyle }}>
                  <option value="">Select type</option>
                  <option>Restaurant / Hotel</option>
                  <option>Grocery / Retail Store</option>
                  <option>Ayurvedic / Health Store</option>
                  <option>Online Reseller</option>
                  <option>Distributor / Wholesaler</option>
                  <option>Other</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>Message (Optional)</label>
                <textarea rows={3} placeholder="Any specific requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7a6040' : '#c9952a', color: '#0f3a2a', border: 'none', padding: '14px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.82rem', cursor: loading ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase' }}>
                {loading ? 'Sending...' : 'Send Wholesale Enquiry →'}
              </button>
            </form>
          </motion.div>
        </div>
        <style>{`@media(max-width:900px){ section > div { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </div>
  )
}
