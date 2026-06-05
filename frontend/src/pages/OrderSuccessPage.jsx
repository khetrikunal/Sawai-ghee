// OrderSuccessPage.jsx
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export function OrderSuccessPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const orderId = state?.orderId || `SWI${Date.now()}`
  const total = state?.total || 0

  return (
    <div style={{ background: '#fdf6e3', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', maxWidth: 560, background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '8px', padding: '3.5rem 2.5rem', boxShadow: '0 10px 40px rgba(15, 58, 42, 0.04)' }}>
        
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(201, 149, 42, 0.1)', border: '2px solid #c9952a', color: '#c9952a', marginBottom: '2rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </motion.div>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#0f3a2a', marginBottom: '1rem', fontWeight: 700 }}>Order Placed Successfully!</h1>
        <p style={{ color: '#4a3820', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.75rem', fontFamily: "'DM Sans', sans-serif" }}>
          Thank you for choosing Sawai Gir Amrut Ghee. Your order has been confirmed and will be dispatched within 1–2 business days.
        </p>
        <div style={{ background: '#0f3a2a', color: '#e4b84a', display: 'inline-block', padding: '0.65rem 1.75rem', fontSize: '0.85rem', letterSpacing: '2px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, borderRadius: '4px', marginBottom: '0.75rem' }}>
          ORDER ID: {orderId}
        </div>
        {total > 0 && <div style={{ color: '#4a3820', fontSize: '0.9rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", marginBottom: '2rem' }}>Amount Paid: ₹{total.toLocaleString('en-IN')}</div>}
        <p style={{ color: '#4a3820', fontSize: '0.85rem', marginBottom: '2.5rem', fontFamily: "'DM Sans', sans-serif" }}>You will receive a confirmation SMS on your registered mobile number.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-gold" style={{ borderRadius: '4px' }} onClick={() => navigate('/products')}>Continue Shopping</button>
          <a href={`https://wa.me/919130643003?text=Hi%2C%20I%20just%20placed%20order%20${orderId}%20on%20Sawai%20Gir%20Amrut%20Ghee%20website!`}
            target="_blank" rel="noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', height: '46px', padding: '0 30px' }}>
            Track via WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default OrderSuccessPage

