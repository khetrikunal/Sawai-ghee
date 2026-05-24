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
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: 560 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</motion.div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#0f3a2a', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
        <p style={{ color: '#4a3820', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Thank you for choosing Sawai Gir Amrut Ghee. Your order has been confirmed and will be dispatched within 1–2 business days.
        </p>
        <div style={{ background: '#0f3a2a', color: '#e4b84a', display: 'inline-block', padding: '0.5rem 1.75rem', fontSize: '0.85rem', letterSpacing: '2px', fontFamily: "'DM Sans', sans-serif", marginBottom: '0.75rem' }}>
          ORDER ID: {orderId}
        </div>
        {total > 0 && <div style={{ color: '#7a6040', fontSize: '0.85rem', marginBottom: '2rem' }}>Amount Paid: ₹{total.toLocaleString('en-IN')}</div>}
        <p style={{ color: '#7a6040', fontSize: '0.82rem', marginBottom: '2.5rem' }}>You will receive a confirmation SMS on your registered mobile number.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-gold" onClick={() => navigate('/products')}>Continue Shopping</button>
          <a href={`https://wa.me/919130643003?text=Hi%2C%20I%20just%20placed%20order%20${orderId}%20on%20Sawai%20Gir%20Amrut%20Ghee%20website!`}
            target="_blank" rel="noreferrer" className="btn-outline-gold" style={{ textDecoration: 'none', display: 'inline-block', lineHeight: 1 }}>
            Track via WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default OrderSuccessPage
