import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderAPI } from '../utils/api'
import { useAuthStore } from '../store'
import toast from 'react-hot-toast'

const statusColors = {
  PENDING: { bg: 'rgba(201, 149, 42, 0.15)', text: '#c9952a' },
  PROCESSING: { bg: 'rgba(66, 133, 244, 0.15)', text: '#4285f4' },
  SHIPPED: { bg: 'rgba(52, 168, 83, 0.15)', text: '#34a853' },
  DELIVERED: { bg: 'rgba(15, 58, 42, 0.15)', text: '#0f3a2a' },
  CANCELLED: { bg: 'rgba(234, 67, 53, 0.15)', text: '#ea4335' },
}

export default function MyOrdersPage() {
  const { user, token } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [returnModal, setReturnModal] = useState(null)
  const [returnReason, setReturnReason] = useState('')
  const [submittingReturn, setSubmittingReturn] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  // Tracking modal states
  const [trackingModal, setTrackingModal] = useState(null)
  const [trackingData, setTrackingData] = useState(null)
  const [loadingTracking, setLoadingTracking] = useState(false)

  useEffect(() => {
    if (token) {
      orderAPI.getMyOrders({ page, size: 5 })
        .then(res => {
          if (res.data && res.data.content) {
            setOrders(res.data.content)
            setTotalPages(res.data.totalPages || 0)
          } else {
            setOrders(Array.isArray(res.data) ? res.data : [])
            setTotalPages(1)
          }
        })
        .catch(() => toast.error('Could not load orders'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token, page])

  const handleReturnRequest = async (orderId) => {
    if (!returnReason.trim()) {
      toast.error('Please provide a reason for return')
      return
    }
    setSubmittingReturn(true)
    try {
      await orderAPI.requestReturn(orderId, { reason: returnReason })
      toast.success('Return request submitted successfully')
      setReturnModal(null)
      setReturnReason('')
      // Refresh orders
      const res = await orderAPI.getMyOrders({ page, size: 5 })
      if (res.data && res.data.content) {
        setOrders(res.data.content)
      } else {
        setOrders(Array.isArray(res.data) ? res.data : [])
      }
    } catch {
      toast.error('Could not submit return request')
    } finally {
      setSubmittingReturn(false)
    }
  }

  const handleTrackOrder = async (orderId) => {
    setTrackingModal(orderId)
    setLoadingTracking(true)
    try {
      const res = await orderAPI.track(orderId)
      setTrackingData(res.data)
    } catch {
      toast.error('Could not load tracking information')
      setTrackingModal(null)
    } finally {
      setLoadingTracking(false)
    }
  }

  if (!token) {
    return (
      <div style={{ background: '#f5ead0', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', fontSize: '2rem', marginBottom: '1rem' }}>Please Log In</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', marginBottom: '1.5rem' }}>You need to be logged in to view your orders.</p>
          <Link to="/login" style={{ background: '#0f3a2a', color: '#e4b84a', padding: '12px 32px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Log In</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f5ead0', minHeight: '80vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem', color: '#0f3a2a', marginBottom: '0.5rem', fontWeight: 700 }}>My Orders</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
          Track and manage your purchases
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: 40, height: 40, border: '3px solid #ede0b8', borderTop: '3px solid #c9952a', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', marginTop: '1rem' }}>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '8px', border: '1px solid rgba(201, 149, 42, 0.15)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9952a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', fontSize: '1.5rem', marginTop: '1rem', marginBottom: '0.5rem' }}>No Orders Yet</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', marginBottom: '1.5rem' }}>Start shopping to see your orders here.</p>
            <Link to="/products" style={{ background: '#0f3a2a', color: '#e4b84a', padding: '12px 32px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Browse Products</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {orders.map(order => {
              const status = statusColors[order.status] || statusColors.PENDING
              const isDelivered = order.status === 'DELIVERED'
              const canReturn = isDelivered && order.createdAt && (new Date() - new Date(order.createdAt)) < 7 * 24 * 60 * 60 * 1000

              return (
                <div key={order.id} style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.02)' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(201, 149, 42, 0.1)', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820' }}>Order ID</span>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: '#0f3a2a', fontSize: '0.95rem' }}>{order.id}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820' }}>Placed On</span>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#0f3a2a', fontSize: '0.9rem' }}>
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </p>
                    </div>
                    <span style={{ background: status.bg, color: status.text, padding: '4px 14px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div style={{ padding: '1rem 1.5rem' }}>
                    {order.items && order.items.map(item => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(201, 149, 42, 0.06)' }}>
                        <div>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", color: '#0f3a2a', fontWeight: 500, fontSize: '0.9rem' }}>{item.productName}</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', fontSize: '0.8rem', marginLeft: '0.5rem' }}>({item.productSize}) × {item.quantity}</span>
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: '#0f3a2a' }}>₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'rgba(15, 58, 42, 0.03)', borderTop: '1px solid rgba(201, 149, 42, 0.1)', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', fontSize: '0.85rem' }}>Total:</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: '#0f3a2a', fontSize: '1.15rem' }}>₹{order.total?.toLocaleString('en-IN')}</span>
                      {order.shipping > 0 && <span style={{ fontSize: '0.75rem', color: '#4a3820' }}>(+₹{order.shipping} shipping)</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {/* INVOICE BUTTON */}
                      <a
                        href={orderAPI.getInvoiceUrl(order.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: 'transparent', border: '1px solid #c9952a', color: '#c9952a', padding: '6px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        onMouseEnter={e => { e.target.style.background = '#c9952a'; e.target.style.color = '#0f3a2a' }}
                        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#c9952a' }}
                      >
                        Invoice
                      </a>

                      {/* TRACKING BUTTON */}
                      {['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) && (
                        <button
                          onClick={() => handleTrackOrder(order.id)}
                          style={{ background: 'transparent', border: '1px solid #0f3a2a', color: '#0f3a2a', padding: '6px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.target.style.background = '#0f3a2a'; e.target.style.color = '#e4b84a' }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#0f3a2a' }}
                        >
                          Track
                        </button>
                      )}

                      {canReturn && (
                        <button
                          onClick={() => setReturnModal(order.id)}
                          style={{ background: 'transparent', border: '1px solid #ea4335', color: '#ea4335', padding: '6px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.target.style.background = '#ea4335'; e.target.style.color = '#fff' }}
                          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#ea4335' }}
                        >
                          Request Return
                        </button>
                      )}
                      <a
                        href={`https://wa.me/919130643003?text=Hi, I need help with order ${order.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: '#0f3a2a', color: '#e4b84a', padding: '6px 16px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", transition: 'background 0.2s', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                        onMouseEnter={e => e.target.style.background = '#1a5c3e'}
                        onMouseLeave={e => e.target.style.background = '#0f3a2a'}
                      >
                        Need Help?
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
            
            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
                <button disabled={page === 0} onClick={() => setPage(page - 1)} 
                  style={{ background: page === 0 ? 'rgba(0,0,0,0.05)' : '#0f3a2a', border: 'none', color: page === 0 ? 'rgba(0,0,0,0.25)' : '#e4b84a', padding: '8px 20px', borderRadius: '4px', cursor: page === 0 ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Previous</button>
                <span style={{ color: '#0f3a2a', alignSelf: 'center', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Page {page + 1} of {totalPages}</span>
                <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} 
                  style={{ background: page >= totalPages - 1 ? 'rgba(0,0,0,0.05)' : '#0f3a2a', border: 'none', color: page >= totalPages - 1 ? 'rgba(0,0,0,0.25)' : '#e4b84a', padding: '8px 20px', borderRadius: '4px', cursor: page >= totalPages - 1 ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Next</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Return Request Modal */}
      {returnModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setReturnModal(null)}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', maxWidth: 450, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', fontSize: '1.5rem', marginBottom: '1rem' }}>Request Return</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Please tell us why you'd like to return this order. We'll process your request within 24 hours.
            </p>
            <textarea
              value={returnReason}
              onChange={e => setReturnReason(e.target.value)}
              placeholder="Reason for return..."
              rows={4}
              style={{ width: '100%', border: '1px solid #ede0b8', padding: '10px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', borderRadius: '4px', background: '#fdf6e3', color: '#1a1208', resize: 'vertical', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
              <button onClick={() => { setReturnModal(null); setReturnReason('') }} style={{ background: 'transparent', border: '1px solid #ede0b8', color: '#4a3820', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Cancel</button>
              <button
                onClick={() => handleReturnRequest(returnModal)}
                disabled={submittingReturn}
                style={{ background: '#ea4335', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: submittingReturn ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
              >
                {submittingReturn ? 'Submitting...' : 'Submit Return'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {trackingModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => { setTrackingModal(null); setTrackingData(null); }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', maxWidth: 500, width: '90%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Track Order</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Order ID: <strong style={{ color: '#0f3a2a' }}>{trackingModal}</strong>
            </p>

            {loadingTracking ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: 30, height: 30, border: '3px solid #ede0b8', borderTop: '3px solid #c9952a', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', marginTop: '1rem', fontSize: '0.85rem' }}>Connecting to Delhivery sorting logs...</p>
              </div>
            ) : trackingData ? (
              <div>
                <div style={{ background: 'rgba(15, 58, 42, 0.03)', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(201, 149, 42, 0.15)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                    <span style={{ color: '#666' }}>Carrier:</span>
                    <strong style={{ color: '#0f3a2a' }}>{trackingData.carrier}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: '#666' }}>Waybill Number:</span>
                    <strong style={{ color: '#0f3a2a' }}>{trackingData.trackingNumber}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '1.5rem', marginLeft: '0.5rem', borderLeft: '2px dashed rgba(201, 149, 42, 0.3)' }}>
                  {trackingData.events && trackingData.events.map((e, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        left: '-2.15rem',
                        top: '0.2rem',
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        background: idx === trackingData.events.length - 1 ? '#c9952a' : '#0f3a2a',
                        border: '3px solid #fff',
                        boxShadow: '0 0 0 2px rgba(201, 149, 42, 0.2)'
                      }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: '#0f3a2a', fontSize: '0.9rem' }}>{e.status}</span>
                        <span style={{ fontSize: '0.72rem', color: '#888' }}>{e.time}</span>
                      </div>
                      <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#4a3820', opacity: 0.8 }}>{e.details}</p>
                      {e.location && <span style={{ display: 'inline-block', marginTop: 4, background: 'rgba(0,0,0,0.05)', padding: '2px 6px', fontSize: '0.65rem', borderRadius: '3px', color: '#666' }}>📍 {e.location}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p style={{ color: '#ea4335', fontSize: '0.88rem' }}>Failed to retrieve carrier tracking updates.</p>
            )}

            <div style={{ display: 'flex', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button onClick={() => { setTrackingModal(null); setTrackingData(null); }} style={{ background: '#0f3a2a', color: '#e4b84a', border: 'none', padding: '8px 20px', borderRadius: '4px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.85rem' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  )
}
