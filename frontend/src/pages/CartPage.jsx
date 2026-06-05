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
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#c9952a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#0f3a2a', marginBottom: '0.75rem', fontWeight: 600 }}>Your cart is empty</h2>
      <p style={{ color: '#4a3820', marginBottom: '2rem', fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }}>Add some pure Gir cow ghee to get started!</p>
      <button className="btn-gold" style={{ borderRadius: '4px' }} onClick={() => navigate('/products')}>Shop Now →</button>
    </div>
  )

  return (
    <div style={{ background: '#fdf6e3', minHeight: '80vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#0f3a2a', marginBottom: '2.5rem', fontWeight: 700 }}>Your Cart</h1>

        <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Items */}
          <div>
            {items.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '8px', padding: '1.25rem', display: 'flex', gap: '1.25rem', marginBottom: '1rem', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
                <div style={{ width: 80, height: 80, background: '#0f3a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', flexShrink: 0 }}>
                  <GheeJar size={60} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#0f3a2a', marginBottom: '0.2rem', fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#4a3820', letterSpacing: '1px', marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif" }}>{item.size} · A2 Gir Cow · Bilona</div>
                  <div style={{ color: '#c9952a', fontWeight: 700, fontSize: '1rem' }}>₹{item.price.toLocaleString('en-IN')}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ede0b8', borderRadius: '4px', overflow: 'hidden' }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 32, height: 32, background: '#f5ead0', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#0f3a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>−</button>
                    <span style={{ width: 40, textAlign: 'center', fontSize: '0.9rem', fontWeight: 600, color: '#1a1208', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 32 }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 32, height: 32, background: '#f5ead0', border: 'none', cursor: 'pointer', fontSize: '1rem', color: '#0f3a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>+</button>
                  </div>
                  <div style={{ fontWeight: 700, color: '#0f3a2a', fontSize: '1rem' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#c62828', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline', fontFamily: "'DM Sans', sans-serif" }}>Remove</button>
                </div>
              </motion.div>
            ))}
            <button onClick={clearCart} style={{ background: 'none', border: '1px solid rgba(201, 149, 42, 0.2)', borderRadius: '4px', color: '#4a3820', padding: '8px 16px', cursor: 'pointer', fontSize: '0.8rem', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.target.style.background = '#f5ead0'; e.target.style.borderColor = '#c9952a'; }}
              onMouseLeave={(e) => { e.target.style.background = 'none'; e.target.style.borderColor = 'rgba(201, 149, 42, 0.2)'; }}>
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="glass-panel-dark" style={{ padding: '2.5rem 2rem', position: 'sticky', top: 100, borderRadius: '8px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.6rem', marginBottom: '1.5rem', fontWeight: 600 }}>Order Summary</h3>
            {[
              ['Subtotal', `₹${subtotal.toLocaleString('en-IN')}`],
              ['Shipping', shipping === 0 ? 'FREE' : `₹${shipping}`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'rgba(253, 246, 227, 0.6)' }}>{l}</span>
                <span style={{ color: v === 'FREE' ? '#4caf50' : '#fdf6e3', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            {shipping === 0 && <div style={{ fontSize: '0.75rem', color: '#4caf50', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>✓</span> Free shipping on orders above ₹999
            </div>}
            <div style={{ borderTop: '1px solid rgba(201,149,42,0.3)', paddingTop: '1.25rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
              <span style={{ color: '#e4b84a', fontSize: '1.2rem', fontFamily: "'Cormorant Garamond', serif" }}>Total</span>
              <span style={{ color: '#e4b84a', fontSize: '1.5rem', fontWeight: 700 }}>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-gold" style={{ width: '100%', marginBottom: '1rem', borderRadius: '4px', display: 'block' }} onClick={() => navigate('/checkout')}>
              Proceed to Checkout →
            </button>
            <a href={`https://wa.me/919130643003?text=Hi%2C%20I%20want%20to%20order.%20Total%3A%20%E2%82%B9${total}`} target="_blank" rel="noreferrer"
              style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', padding: '14px', borderRadius: '4px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', letterSpacing: '1.5px', textTransform: 'uppercase', transition: 'background 0.2s' }}
              onMouseEnter={(e) => e.target.style.background = '#20ba5a'}
              onMouseLeave={(e) => e.target.style.background = '#25D366'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.907h.004c4.368 0 7.926-3.559 7.93-7.93a7.897 7.897 0 0 0-2.327-5.615zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.101-1.202-.594-1.387-.662-.185-.069-.32-.101-.453.101-.134.201-.518.662-.635.794-.117.133-.235.148-.437.047-.202-.101-.85-.313-1.619-.997-.599-.533-.102-1.082-.3-1.393-.117-.2-.117-.375-.059-.504.059-.13.185-.303.277-.41.093-.108.124-.18.186-.302.062-.122.031-.229-.015-.33-.046-.1-.453-1.096-.62-1.49-.164-.398-.343-.343-.473-.349-.12-.006-.258-.007-.396-.007-.138 0-.362.052-.551.258-.189.206-.722.706-.722 1.72 0 1.015.739 1.996.842 2.132.103.136 1.454 2.22 3.522 3.111.492.212.876.339 1.176.435.495.158.946.136 1.3.084.394-.059 1.202-.491 1.371-1.096.17-.604.17-1.121.119-1.229-.051-.108-.185-.164-.387-.266z"/>
              </svg>
              Order via WhatsApp
            </a>
            <div style={{ marginTop: '1.5rem' }}>
              {['Secure Razorpay Payments', 'Easy 7-day Returns', 'COD Available on Request'].map(b => (
                <div key={b} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.8rem', color: 'rgba(253, 246, 227, 0.45)', alignItems: 'center' }}>
                  <span style={{ color: '#c9952a', fontWeight: 'bold' }}>✓</span>{b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){
          .cart-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .cart-grid > div:last-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  )
}

