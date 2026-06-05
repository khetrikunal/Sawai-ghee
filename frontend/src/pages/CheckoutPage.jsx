import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCartStore, useAuthStore } from '../store'
import { orderAPI, paymentAPI, couponAPI } from '../utils/api'

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

  const applyCoupon = async () => {
    if (!coupon.trim()) return toast.error('Please enter a coupon code')
    try {
      const { data } = await couponAPI.validate(coupon.trim())
      setDiscount(data.discountPercent)
      toast.success(`Coupon applied! ${data.discountPercent}% off`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid coupon code')
      setDiscount(0)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    if (items.length === 0) return toast.error('Cart is empty')
    setLoading(true)

    try {
      const loaded = await loadRazorpay()
      if (!loaded) throw new Error('Razorpay SDK failed to load')

      // Create order on backend first (in PENDING status)
      const orderPayload = {
        items: items.map(i => ({ productVariantId: i.productVariantId || i.id, quantity: i.qty, price: i.price })),
        shippingAddress: form,
        total, couponCode: coupon || null,
      }

      let backendOrderId, razorpayOrderId
      try {
        const { data: orderRes } = await orderAPI.create(orderPayload)
        backendOrderId = orderRes.data.id
      } catch (err) {
        toast.error(err.response?.data?.message || 'Could not register order details. Please try again.')
        setLoading(false)
        return
      }

      // Create Razorpay order referencing the backend order ID
      try {
        const { data: paymentRes } = await paymentAPI.createOrder({ amount: total, currency: 'INR', receipt: backendOrderId })
        razorpayOrderId = paymentRes.data.id
      } catch (err) {
        toast.error('Could not initiate payment system. Please try again.')
        setLoading(false)
        return
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
            toast.success('Payment verified successfully!')
            clearCart()
            navigate('/order-success', { state: { orderId: backendOrderId, total, form } })
          } catch (err) {
            toast.error(err.response?.data?.message || 'Payment verification failed. Please contact support.')
            setLoading(false)
          }
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
    background: '#fdf6e3', color: '#1a1208', transition: 'all 0.2s',
    borderRadius: '4px',
  }

  return (
    <div style={{ background: '#f5ead0', minHeight: '80vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 1050, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: '#0f3a2a', marginBottom: '2.5rem', fontWeight: 700 }}>Checkout</h1>

        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Form */}
          <form onSubmit={handlePayment}>
            <div style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '8px', padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#0f3a2a', marginBottom: '1.5rem', borderBottom: '1px solid #ede0b8', paddingBottom: '0.75rem', fontWeight: 600 }}>
                Delivery Details
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
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
                    <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820', marginBottom: 6, fontWeight: 600 }}>{f.l}</label>
                    <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                      required={f.k !== 'landmark'} style={inputStyle}
                      onFocus={e => {
                        e.target.style.borderColor = '#c9952a';
                        e.target.style.boxShadow = '0 0 0 3px rgba(201, 149, 42, 0.15)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = '#ede0b8';
                        e.target.style.boxShadow = 'none';
                      }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Have a Coupon?</h4>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="Enter coupon code"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => {
                    e.target.style.borderColor = '#c9952a';
                    e.target.style.boxShadow = '0 0 0 3px rgba(201, 149, 42, 0.15)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = '#ede0b8';
                    e.target.style.boxShadow = 'none';
                  }} />
                <button type="button" onClick={applyCoupon}
                  style={{ background: '#0f3a2a', color: '#e4b84a', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '1px', whiteSpace: 'nowrap', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.target.style.background = '#1a5c3e'}
                  onMouseLeave={(e) => e.target.style.background = '#0f3a2a'}>
                  Apply
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#4a3820', marginTop: '0.5rem' }}>Enter your coupon code above</p>
            </div>

            {/* Razorpay notice */}
            <div style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.2)', padding: '1.5rem', marginBottom: '2rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
              <div style={{ fontWeight: 600, color: '#0f3a2a', marginBottom: '0.5rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f3a2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                  <line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                Secure Payment via Razorpay
              </div>
              <div style={{ fontSize: '0.8rem', color: '#4a3820', lineHeight: 1.5 }}>Accepts UPI, Credit/Debit Cards, Net Banking, and Wallets. 100% secure and encrypted.</div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold" style={{
              width: '100%', padding: '16px', background: loading ? '#7a6040' : '#c9952a',
              color: '#0f3a2a', border: 'none', fontWeight: 700, letterSpacing: '2px',
              fontSize: '0.88rem', cursor: loading ? 'default' : 'pointer', borderRadius: '4px',
              fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', transition: 'background 0.2s, transform 0.1s'
            }}>
              {loading ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')} →`}
            </button>
          </form>

          {/* Summary */}
          <div className="glass-panel-dark" style={{ padding: '2.5rem 2rem', position: 'sticky', top: 100, borderRadius: '8px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '1.6rem', marginBottom: '1.5rem', fontWeight: 600 }}>Order Summary</h3>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'rgba(253, 246, 227, 0.6)' }}>{item.name} {item.size} × {item.qty}</span>
                <span style={{ color: '#fdf6e3', fontWeight: 500 }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
              {[
                ['Subtotal', `₹${subtotal.toLocaleString('en-IN')}`],
                ['Shipping', shipping === 0 ? 'FREE' : `₹${shipping}`],
                ...(discountAmt > 0 ? [['Coupon Discount', `-₹${discountAmt.toLocaleString('en-IN')}`]] : []),
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'rgba(253, 246, 227, 0.5)' }}>{l}</span>
                  <span style={{ color: v.startsWith('-') ? '#4caf50' : v === 'FREE' ? '#4caf50' : '#fdf6e3' }}>{v}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(201,149,42,0.3)', paddingTop: '1.25rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}>Total</span>
                <span style={{ color: '#e4b84a', fontWeight: 700, fontSize: '1.5rem' }}>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderTop: '1px solid rgba(201,149,42,0.15)', borderRadius: '4px' }}>
              {['100% Secure Payments', 'Easy 7-day Returns', 'COD available on request', 'Genuine A2 Gir Ghee guaranteed'].map(b => (
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
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .checkout-grid > div:last-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  )
}
