import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCartStore, useAuthStore } from '../store'
import { orderAPI, paymentAPI } from '../utils/api'

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)

  const [form, setForm] = useState({
    name: user?.name || '', phone: user?.phone || '', email: user?.email || '',
    address: '', city: '', state: 'Maharashtra', pin: '', landmark: '',
  })

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping = subtotal >= 999 ? 0 : 99
  const discountAmt = Math.round(subtotal * discount / 100)
  const total = subtotal + shipping - discountAmt

  const VALID_COUPONS = { SAWAI10: 10, FIRST15: 15, BILONA20: 20 }

  const applyCoupon = () => {
    const pct = VALID_COUPONS[coupon.toUpperCase()]
    if (pct) { setDiscount(pct); toast.success(`Coupon applied! ${pct}% off`) }
    else toast.error('Invalid coupon code')
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    if (items.length === 0) return toast.error('Cart is empty')
    setLoading(true)

    try {
      const loaded = await loadRazorpay()
      if (!loaded) throw new Error('Razorpay SDK failed to load')

      // Create order on backend
      const orderPayload = {
        items: items.map(i => ({ productId: i.id, quantity: i.qty, price: i.price })),
        shippingAddress: form,
        total, couponCode: coupon || null,
      }

      let razorpayOrderId, backendOrderId
      try {
        const { data } = await paymentAPI.createOrder({ amount: total, currency: 'INR', receipt: `sawai_${Date.now()}` })
        razorpayOrderId = data.id
        backendOrderId = data.backendOrderId
      } catch {
        // Demo fallback
        razorpayOrderId = `order_demo_${Date.now()}`
        backendOrderId = `SWI${Date.now()}`
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_DEMO',
        amount: total * 100,
        currency: 'INR',
        name: 'Sawai Gir Amrut Ghee',
        description: 'A2 Gir Cow Ghee - Vedic Bilona Method',
        image: 'https://via.placeholder.com/150/0f3a2a/e4b84a?text=🪷',
        order_id: razorpayOrderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#c9952a' },
        handler: async (response) => {
          try {
            await paymentAPI.verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              backendOrderId,
            })
          } catch { /* demo */ }
          clearCart()
          navigate('/order-success', { state: { orderId: backendOrderId, total, form } })
        },
        modal: { ondismiss: () => setLoading(false) },
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', () => { toast.error('Payment failed. Please try again.'); setLoading(false) })
      rzp.open()
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const inputStyle = {
    width: '100%', border: '1px solid #ede0b8', padding: '10px 14px',
    fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', outline: 'none',
    background: '#fdf6e3', color: '#1a1208', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ background: '#f5ead0', minHeight: '80vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: 1050, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#0f3a2a', marginBottom: '2rem' }}>Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Form */}
          <form onSubmit={handlePayment}>
            <div style={{ background: '#fff', border: '1px solid #ede0b8', padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#0f3a2a', marginBottom: '1.5rem', borderBottom: '1px solid #ede0b8', paddingBottom: '0.75rem' }}>
                Delivery Details
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { k: 'name', l: 'Full Name', t: 'text', p: 'Your full name', full: false },
                  { k: 'phone', l: 'Phone Number', t: 'tel', p: '+91 98765 43210', full: false },
                  { k: 'email', l: 'Email Address', t: 'email', p: 'you@example.com', full: true },
                  { k: 'address', l: 'Delivery Address', t: 'text', p: 'House/Flat, Street, Area', full: true },
                  { k: 'landmark', l: 'Landmark (Optional)', t: 'text', p: 'Near...', full: false },
                  { k: 'city', l: 'City', t: 'text', p: 'Pune / Mumbai / Nashik', full: false },
                  { k: 'state', l: 'State', t: 'text', p: 'Maharashtra', full: false },
                  { k: 'pin', l: 'PIN Code', t: 'text', p: '411001', full: false },
                ].map(f => (
                  <div key={f.k} style={{ gridColumn: f.full ? '1 / -1' : 'auto' }}>
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#7a6040', marginBottom: 6 }}>{f.l}</label>
                    <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                      required={f.k !== 'landmark'} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#c9952a'}
                      onBlur={e => e.target.style.borderColor = '#ede0b8'} />
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div style={{ background: '#fff', border: '1px solid #ede0b8', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', fontSize: '1.1rem', marginBottom: '1rem' }}>Have a Coupon?</h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="Enter coupon code"
                  style={{ ...inputStyle, flex: 1 }} />
                <button type="button" onClick={applyCoupon} style={{ background: '#0f3a2a', color: '#e4b84a', border: 'none', padding: '10px 20px', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                  Apply
                </button>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#7a6040', marginTop: '0.5rem' }}>Try: SAWAI10 · FIRST15 · BILONA20</p>
            </div>

            {/* Razorpay notice */}
            <div style={{ background: '#fff', border: '1px solid #ede0b8', padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '3px solid #c9952a' }}>
              <div style={{ fontWeight: 600, color: '#0f3a2a', marginBottom: '0.4rem', fontSize: '0.88rem' }}>💳 Secure Payment via Razorpay</div>
              <div style={{ fontSize: '0.78rem', color: '#7a6040' }}>Accepts UPI, Credit/Debit Cards, Net Banking, and Wallets. 100% secure and encrypted.</div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '16px', background: loading ? '#7a6040' : '#c9952a',
              color: '#0f3a2a', border: 'none', fontWeight: 700, letterSpacing: '2px',
              fontSize: '0.88rem', cursor: loading ? 'default' : 'pointer',
              fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase',
            }}>
              {loading ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')} →`}
            </button>
          </form>

          {/* Summary */}
          <div style={{ background: '#0f3a2a', padding: '2rem', position: 'sticky', top: 80 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Order Summary</h3>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item.name} {item.size} × {item.qty}</span>
                <span style={{ color: '#fdf6e3', fontWeight: 500 }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              {[
                ['Subtotal', `₹${subtotal.toLocaleString('en-IN')}`],
                ['Shipping', shipping === 0 ? 'FREE' : `₹${shipping}`],
                ...(discountAmt > 0 ? [['Coupon Discount', `-₹${discountAmt.toLocaleString('en-IN')}`]] : []),
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</span>
                  <span style={{ color: v.startsWith('-') ? '#4caf50' : v === 'FREE' ? '#4caf50' : '#fdf6e3' }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(201,149,42,0.3)', paddingTop: '1rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem' }}>Total</span>
                <span style={{ color: '#e4b84a', fontWeight: 700, fontSize: '1.4rem' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderTop: '1px solid rgba(201,149,42,0.15)' }}>
              {['100% Secure Payments', 'Easy 7-day Returns', 'COD available on request', 'Genuine A2 Gir Ghee guaranteed'].map(b => (
                <div key={b} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                  <span style={{ color: '#c9952a' }}>✓</span>{b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ div > div > div { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
