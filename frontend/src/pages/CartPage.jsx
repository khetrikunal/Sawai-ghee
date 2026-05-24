import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../store'
import GheeJar from '../components/GheeJar'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, removeItem, updateQty, clearCart } = useCartStore()
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  if (items.length === 0) return (
    <div style={{ background: '#fdf6e3', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛒</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: '#0f3a2a', marginBottom: '0.75rem' }}>Your cart is empty</h2>
      <p style={{ color: '#7a6040', marginBottom: '2rem', fontSize: '0.9rem' }}>Add some pure Gir cow ghee to get started!</p>
      <button className="btn-gold" onClick={() => navigate('/products')}>Shop Now →</button>
    </div>
  )

  return (
    <div style={{ background: '#fdf6e3', minHeight: '80vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#0f3a2a', marginBottom: '2rem' }}>Your Cart</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Items */}
          <div>
            {items.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{ background: '#fff', border: '1px solid #ede0b8', padding: '1.25rem', display: 'flex', gap: '1.25rem', marginBottom: '1rem', alignItems: 'center' }}>
                <div style={{ width: 80, height: 80, background: '#0f3a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <GheeJar size={60} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: '#0f3a2a', marginBottom: '0.2rem' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#7a6040', letterSpacing: '1px', marginBottom: '0.5rem' }}>{item.size} · A2 Gir Cow · Bilona</div>
                  <div style={{ color: '#c9952a', fontWeight: 700, fontSize: '1rem' }}>₹{item.price.toLocaleString('en-IN')}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ede0b8' }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 32, height: 32, background: '#f5ead0', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#0f3a2a' }}>−</button>
                    <span style={{ width: 40, textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 32, height: 32, background: '#f5ead0', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#0f3a2a' }}>+</button>
                  </div>
                  <div style={{ fontWeight: 700, color: '#0f3a2a', fontSize: '1rem' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#c62828', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline' }}>Remove</button>
                </div>
              </motion.div>
            ))}
            <button onClick={clearCart} style={{ background: 'none', border: '1px solid #ede0b8', color: '#7a6040', padding: '8px 16px', cursor: 'pointer', fontSize: '0.78rem', fontFamily: "'DM Sans', sans-serif" }}>
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div style={{ background: '#0f3a2a', padding: '2rem', position: 'sticky', top: 80 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Order Summary</h3>
            {[
              ['Subtotal', `₹${subtotal.toLocaleString('en-IN')}`],
              ['Shipping', shipping === 0 ? 'FREE' : `₹${shipping}`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</span>
                <span style={{ color: v === 'FREE' ? '#4caf50' : '#fdf6e3', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            {shipping === 0 && <div style={{ fontSize: '0.72rem', color: '#4caf50', marginBottom: '0.75rem' }}>✓ Free shipping on orders above ₹999</div>}
            <div style={{ borderTop: '1px solid rgba(201,149,42,0.3)', paddingTop: '1rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
              <span style={{ color: '#e4b84a', fontSize: '1.1rem', fontFamily: "'Cormorant Garamond', serif" }}>Total</span>
              <span style={{ color: '#e4b84a', fontSize: '1.4rem', fontWeight: 700 }}>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-gold" style={{ width: '100%', marginBottom: '0.75rem' }} onClick={() => navigate('/checkout')}>
              Proceed to Checkout →
            </button>
            <a href={`https://wa.me/919130643003?text=Hi%2C%20I%20want%20to%20order.%20Total%3A%20%E2%82%B9${total}`} target="_blank" rel="noreferrer"
              style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', padding: '12px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', letterSpacing: '1px' }}>
              💬 Order via WhatsApp
            </a>
            <div style={{ marginTop: '1.5rem' }}>
              {['Secure Razorpay Payments', 'Easy 7-day Returns', 'COD Available on Request'].map(b => (
                <div key={b} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ color: '#c9952a' }}>✓</span>{b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ div > div > div:first-child+div { position: static !important; } .cart-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
