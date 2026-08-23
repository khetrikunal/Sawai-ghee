import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { wholesaleAPI } from '../utils/api'

const TIERS = [
  // New premium wholesale tiers (retail struck values are shown in UI)
  {
    size: '200ml',
    tierLabel: '5L · 100 Bottles',
    pricePerBottle: 600, // ₹600/bottle
    discountLine: 'Save ₹40/bottle (₹640 struck)',
    unitEquivalent: '5L',
  },
  {
    size: '200ml',
    tierLabel: '10L · 200 Bottles',
    pricePerBottle: 580, // ₹580/bottle
    discountLine: 'Save ₹60/bottle (₹640 struck)',
    unitEquivalent: '10L',
  },
  {
    size: '200ml',
    tierLabel: '100L · 2000 Bottles',
    pricePerBottle: 520, // ₹520/bottle
    discountLine: 'Save ₹120/bottle (₹640 struck)',
    unitEquivalent: '100L',
  },

  {
    size: '500ml',
    tierLabel: '5L · 10 Bottles',
    pricePerBottle: 1500, // ₹1500/bottle
    discountLine: 'Save ₹100/bottle (₹1600 struck)',
    unitEquivalent: '5L',
  },
  {
    size: '500ml',
    tierLabel: '10L · 20 Bottles',
    pricePerBottle: 1450, // ₹1450/bottle
    discountLine: 'Save ₹150/bottle (₹1600 struck)',
    unitEquivalent: '10L',
  },
  {
    size: '500ml',
    tierLabel: '100L · 200 Bottles',
    pricePerBottle: 1300, // ₹1300/bottle
    discountLine: 'Save ₹300/bottle (₹1600 struck)',
    unitEquivalent: '100L',
  },

  {
    size: '1L',
    tierLabel: '5L · 5 Bottles',
    pricePerBottle: 3000, // ₹3000/bottle
    discountLine: 'Save ₹200/bottle (₹3200 struck)',
    unitEquivalent: '5L',
  },
  {
    size: '1L',
    tierLabel: '10L · 10 Bottles',
    pricePerBottle: 2900, // ₹2900/bottle
    discountLine: 'Save ₹300/bottle (₹3200 struck)',
    unitEquivalent: '10L',
  },
  {
    size: '1L',
    tierLabel: '100L · 100 Bottles',
    pricePerBottle: 2600, // ₹2600/bottle
    discountLine: 'Save ₹600/bottle (₹3200 struck)',
    unitEquivalent: '100L',
  },
]

export default function WholesalePage() {
  const [loading, setLoading] = useState(false)

  const PLAN_TIER = {
    '5L': { limitLiters: 5, ratePerLitre: 2800 },
    '10L': { limitLiters: 10, ratePerLitre: 2700 },
    '100L': { limitLiters: 100, ratePerLitre: 2500 },
  }

  const [selectedPlan, setSelectedPlan] = useState('5L')

  const [qty200ml, setQty200ml] = useState(0)
  const [qty500ml, setQty500ml] = useState(0)
  const [qty1L, setQty1L] = useState(0)

  const computedLiters = (qty200ml * 0.2) + (qty500ml * 0.5) + (qty1L * 1)
  const totalLiters = Math.round(computedLiters * 10) / 10 // 1 decimal precision
  const remainingLiters = Math.max(0, Math.round((PLAN_TIER[selectedPlan].limitLiters - computedLiters) * 10) / 10)
  const totalPrice = Math.round(computedLiters * PLAN_TIER[selectedPlan].ratePerLitre)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    planType: '5L',
    qty200ml: 0,
    qty500ml: 0,
    qty1L: 0,
    businessType: '',
    city: '',
    message: ''
  })

  const syncFormPricing = (nextPlan = selectedPlan, nextQty200ml = qty200ml, nextQty500ml = qty500ml, nextQty1L = qty1L) => {
    setForm((prev) => ({
      ...prev,
      planType: nextPlan,
      qty200ml: nextQty200ml,
      qty500ml: nextQty500ml,
      qty1L: nextQty1L,
    }))
  }

  const canAdd = (deltaLiters) => {
    const nextLiters = computedLiters + deltaLiters
    return nextLiters <= PLAN_TIER[selectedPlan].limitLiters + 1e-9
  }

  const inc200 = () => {
    if (!canAdd(0.2)) return
    setQty200ml((v) => {
      const nv = v + 1
      syncFormPricing(selectedPlan, nv, qty500ml, qty1L)
      return nv
    })
  }
  const dec200 = () => {
    setQty200ml((v) => {
      const nv = Math.max(0, v - 1)
      syncFormPricing(selectedPlan, nv, qty500ml, qty1L)
      return nv
    })
  }

  const inc500 = () => {
    if (!canAdd(0.5)) return
    setQty500ml((v) => {
      const nv = v + 1
      syncFormPricing(selectedPlan, qty200ml, nv, qty1L)
      return nv
    })
  }
  const dec500 = () => {
    setQty500ml((v) => {
      const nv = Math.max(0, v - 1)
      syncFormPricing(selectedPlan, qty200ml, nv, qty1L)
      return nv
    })
  }

  const inc1L = () => {
    if (!canAdd(1)) return
    setQty1L((v) => {
      const nv = v + 1
      syncFormPricing(selectedPlan, qty200ml, qty500ml, nv)
      return nv
    })
  }
  const dec1L = () => {
    setQty1L((v) => {
      const nv = Math.max(0, v - 1)
      syncFormPricing(selectedPlan, qty200ml, qty500ml, nv)
      return nv
    })
  }

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan)
    const nextLimit = PLAN_TIER[plan].limitLiters
    // If existing liters exceed new limit, clamp quantities by ratio (simple approach: reset to 0)
    if (computedLiters > nextLimit + 1e-9) {
      setQty200ml(0)
      setQty500ml(0)
      setQty1L(0)
      setForm((prev) => ({ ...prev, planType: plan, qty200ml: 0, qty500ml: 0, qty1L: 0 }))
      return
    }
    syncFormPricing(plan)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await wholesaleAPI.submitLead(form)
      toast.success('Enquiry submitted! We will contact you within 24 hours.')
      setSelectedPlan('5L')
      setQty200ml(0)
      setQty500ml(0)
      setQty1L(0)
      setForm({ name: '', phone: '', email: '', planType: '5L', qty200ml: 0, qty500ml: 0, qty1L: 0, businessType: '', city: '', message: '' })
    } catch {
      // Demo mode fallback
      toast.success('Enquiry submitted! We will contact you within 24 hours.')
      setSelectedPlan('5L')
      setQty200ml(0)
      setQty500ml(0)
      setQty1L(0)
      setForm({ name: '', phone: '', email: '', planType: '5L', qty200ml: 0, qty500ml: 0, qty1L: 0, businessType: '', city: '', message: '' })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    color: '#fdf6e3',
    padding: '14px 18px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '1.02rem',
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
      <div style={{ background: '#0f3a2a', padding: '6.5rem 2rem 5rem', textAlign: 'center', borderBottom: '2.5px solid #c9952a' }}>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(3rem, 6vw, 4.8rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
          Wholesale Enquiry
        </motion.h1>
        <p style={{ color: '#ede0b8', fontSize: '1.45rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
          Bulk pricing for retailers, restaurants & distributors
        </p>
      </div>

      <section style={{ background: 'linear-gradient(135deg, #0a2819 0%, #0f3a2a 100%)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5.5rem', alignItems: 'start' }}>

          {/* Left: Tiers & Benefits */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ color: '#e4b84a', fontSize: '0.9rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700 }}>✦ Wholesale Pricing ✦</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 700, marginBottom: '1.5rem', lineHeight: 1.1 }}>Bulk Order Tiers</h2>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.08rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              We partner with restaurants, hotels, Ayurvedic stores, grocery retailers, and distributors across Maharashtra and beyond. Volume rewards you with better pricing.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                {['5L','10L','100L'].map((p) => {
                  const isActive = selectedPlan === p
                  const { ratePerLitre } = PLAN_TIER[p]
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handlePlanSelect(p)}
                      style={{
                        textAlign: 'left',
                        cursor: 'pointer',
                        background: isActive ? 'rgba(201,149,42,0.22)' : 'rgba(255,255,255,0.05)',
                        border: `1.5px solid ${isActive ? 'rgba(201,149,42,0.85)' : 'rgba(201,149,42,0.3)'}`,
                        borderRadius: '14px',
                        padding: '1.4rem 1.6rem',
                        color: '#f5ead0',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ color: '#e4b84a', fontWeight: 800, fontSize: '1.35rem' }}>{p} Plan</div>
                          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.98rem', marginTop: 4, fontWeight: 500 }}>
                            ₹{ratePerLitre.toLocaleString('en-IN')} / L
                          </div>
                        </div>
                        <div style={{ color: isActive ? '#e4b84a' : '#f5ead0', fontWeight: 800, fontSize: '1.05rem' }}>{isActive ? 'Selected ✓' : 'Select →'}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Bottle Builder (shown after selection) */}
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(201,149,42,0.3)', borderRadius: '16px', padding: '1.75rem' }}>
                <div style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                  🧴 Choose Bottle Combination
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '1.25rem' }}>
                  {[{
                    label: '200ml',
                    perBottleLiters: 0.2,
                    qty: qty200ml,
                    onInc: inc200,
                    onDec: dec200,
                  },{
                    label: '500ml',
                    perBottleLiters: 0.5,
                    qty: qty500ml,
                    onInc: inc500,
                    onDec: dec500,
                  },{
                    label: '1L',
                    perBottleLiters: 1,
                    qty: qty1L,
                    onInc: inc1L,
                    onDec: dec1L,
                  }].map((row) => (
                    <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ color: '#f5ead0', fontWeight: 700, fontSize: '1.05rem' }}>{row.label}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                        <button type="button" onClick={row.onDec} style={{ width: 42, height: 40, borderRadius: 8, border: '1px solid rgba(201,149,42,0.4)', background: 'rgba(0,0,0,0.2)', color: '#fdf6e3', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}>-</button>
                        <div style={{ minWidth: 50, textAlign: 'center', color: '#fdf6e3', fontWeight: 800, fontSize: '1.15rem' }}>{row.qty}</div>
                        <button type="button" onClick={row.onInc} style={{ width: 42, height: 40, borderRadius: 8, border: '1px solid rgba(201,149,42,0.4)', background: 'rgba(0,0,0,0.2)', color: '#fdf6e3', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
                  <div style={{ background: 'rgba(201,149,42,0.12)', border: '1px solid rgba(201,149,42,0.3)', borderRadius: 12, padding: '1.1rem' }}>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>Selected Plan</div>
                    <div style={{ color: '#e4b84a', fontWeight: 800, fontSize: '1.18rem', marginTop: 4 }}>{selectedPlan} (₹{PLAN_TIER[selectedPlan].ratePerLitre}/L)</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '1.1rem' }}>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>Remaining</div>
                    <div style={{ color: '#4caf50', fontWeight: 800, fontSize: '1.18rem', marginTop: 4 }}>{remainingLiters}L</div>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', padding: '1.25rem', borderRadius: 12, border: '1px solid rgba(201,149,42,0.3)', background: 'rgba(201,149,42,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>Total Liters</div>
                      <div style={{ color: '#fdf6e3', fontWeight: 900, fontSize: '1.25rem', marginTop: 2 }}>{totalLiters}L</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>Total Price</div>
                      <div style={{ color: '#e4b84a', fontWeight: 900, fontSize: '1.45rem', marginTop: 2 }}>₹{totalPrice.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', marginTop: 8 }}>
                    Live preview updates instantly as you adjust bottle quantities.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(201,149,42,0.12)', border: '1.5px solid rgba(201,149,42,0.3)', borderRadius: '16px', padding: '2rem' }}>
              <div style={{ color: '#e4b84a', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.55rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                <div key={b} style={{ display: 'flex', gap: '0.85rem', marginBottom: '0.9rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#e4b84a', flexShrink: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.98rem', lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            className="glass-panel-dark"
            style={{ padding: '3rem 2.5rem', borderRadius: '18px', border: '1.5px solid rgba(201,149,42,0.35)', boxShadow: '0 20px 50px rgba(0,0,0,0.35)' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fdf6e3', fontSize: '2.2rem', fontWeight: 700, marginBottom: '2rem' }}>Send Enquiry</h3>
            <form onSubmit={handleSubmit}>
              {[
                { k: 'name', l: 'Full Name', t: 'text', p: 'Your full name' },
                { k: 'phone', l: 'Phone Number', t: 'tel', p: '+91 98765 43210' },
                { k: 'email', l: 'Email Address', t: 'email', p: 'you@business.com' },
                { k: 'city', l: 'City / District', t: 'text', p: 'Pune, Nashik, Mumbai...' },
              ].map(f => (
                <div key={f.k} style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>{f.l}</label>
                  <input type={f.t} placeholder={f.p} value={form[f.k]} onChange={e => setForm({ ...form, [f.k]: e.target.value })} required style={inputStyle} className="wholesale-input" />
                </div>
              ))}

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>Business Type</label>
                <select value={form.businessType} onChange={e => setForm({ ...form, businessType: e.target.value })} required style={{ ...inputStyle }} className="wholesale-input select-dark">
                  <option value="" style={{ color: '#0f3a2a' }}>Select type</option>
                  {['Restaurant / Hotel', 'Grocery / Retail Store', 'Ayurvedic / Health Store', 'Online Reseller', 'Distributor / Wholesaler', 'Other'].map(opt => (
                    <option key={opt} style={{ color: '#0f3a2a' }}>{opt}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '1.75rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>Message (Optional)</label>
                <textarea rows={3} placeholder="Any specific requirements..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical' }} className="wholesale-input" />
              </div>

              <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7a6040' : '#c9952a', color: '#0f3a2a', border: 'none', padding: '16px', fontWeight: 700, letterSpacing: '2px', fontSize: '0.98rem', cursor: loading ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', transition: 'all 0.2s ease-out', borderRadius: '8px' }}
                onMouseEnter={e => { if (!loading) { e.target.style.background = '#e4b84a'; e.target.style.transform = 'translateY(-1px)'; } }}
                onMouseLeave={e => { if (!loading) { e.target.style.background = '#c9952a'; e.target.style.transform = 'translateY(0px)'; } }}>
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
        @media(max-width:960px){
          section > div {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </div>
  )
}
