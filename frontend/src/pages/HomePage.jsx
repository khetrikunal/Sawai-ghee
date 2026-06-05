import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import ProductCard from '../components/ProductCard'
import { productAPI } from '../utils/api'
import bgImage from '../assets/bottels.jpeg'
import logovittiba from '../assets/vittho.jpeg'
import bgImage1 from '../assets/bottel.jpeg'

const FEATURES = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: '100% A2 Gir Cow',
    desc: 'Sourced exclusively from pure-bred Gir cows raised at our Phaltan farm — the gold standard of traditional breeds.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Vedic Bilona Method',
    desc: 'Curd churned with a traditional wooden bilona, then slow-simmered on low flame to preserve all natural nutrients.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 2 2 4a7 7 0 0 1-7 7h-2v7Z" />
        <path d="M9 22H3" />
      </svg>
    ),
    title: 'No Preservatives',
    desc: 'Zero artificial colors, flavors, or additives. Pure, natural ghee as nature and tradition intended.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e4b84a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    title: 'Rich Golden Aroma',
    desc: 'Natural grainy texture and the unmistakable fragrance that only genuine Bilona ghee can possess.',
  },
]

const TESTIMONIALS = [
  {
    text: 'After switching to Sawai Gir Amrut Ghee, the difference in taste and digestion was remarkable. My doctor was also impressed. Pure, authentic, and truly special!',
    name: 'Priya Sharma',
    loc: 'Pune',
    initials: 'PS',
  },
  {
    text: "This is the closest I have found to my grandmother's ghee. The aroma, color, and grainy texture are exactly right. Highly recommended for every family!",
    name: 'Ramesh Patil',
    loc: 'Nashik',
    initials: 'RP',
  },
  {
    text: 'I ordered the 5L bulk pack for our restaurant and customer feedback has been outstanding. The ghee enhances every dish beautifully. Regular customer now!',
    name: 'Suresh Mehta',
    loc: 'Mumbai',
    initials: 'SM',
  },
]

const COMP_ROWS = [
  { feature: 'Milk Source', us: 'Pure A2 Gir Cow Milk (Single Farm)', other: 'Mixed / A1 foreign milk (Commercial)' },
  { feature: 'Production Method', us: 'Traditional Vedic Bilona (from hand-churned curd)', other: 'Industrial high-heat cream method' },
  { feature: 'Nutrient Value', us: 'Rich in Vitamins A, D, E, K, CLA, and Omega-3', other: 'Reduced drastically due to processing heat' },
  { feature: 'Digestibility', us: 'Highly gut-friendly, anti-acidic, easy to absorb', other: 'Can feel heavy, often triggers acidity' },
  { feature: 'Texture & Color', us: 'Natural golden hue, distinctly grainy texture', other: 'Pale yellow, smooth, lacks consistency' },
  { feature: 'Aroma', us: 'Pure, rich fragrance of traditional ghee', other: 'Mild or enhanced with artificial flavorings' },
  { feature: 'Additives', us: '100% natural, strictly zero preservatives', other: 'Frequently contains stabilizers and colorings' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    productAPI
      .getAll({ active: true })
      .then((r) => setProducts(r.data?.slice(0, 3) || []))
      .catch(() => {
        setProducts([
          { id: 1, name: 'Sawai Gir Amrut Ghee', size: '200 ml', price: 640, badge: 'Popular' },
          { id: 2, name: 'Sawai Gir Amrut Ghee', size: '500 ml', price: 1600, badge: 'Best Seller' },
          { id: 3, name: 'Sawai Gir Amrut Ghee', size: '1 Litre', price: 3200, badge: 'Great Value' },
        ])
      })
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--cream-light)', color: 'var(--text)' }}>
      <Helmet>
        <title>Sawai Gir Amrut Ghee | Premium A2 Gir Cow Vedic Bilona Ghee</title>
        <meta name="description" content="Buy premium A2 Gir Cow Ghee handcrafted using traditional Vedic Bilona method in Phaltan, Maharashtra. Rich golden grainy texture, high aroma, zero preservatives." />
        <meta name="keywords" content="A2 ghee, bilona ghee, Gir cow ghee, pure ghee online, Vedic ghee, buy organic ghee, Sawai ghee" />
        <link rel="canonical" href="https://sawaighee.com/" />
        <meta property="og:title" content="Sawai Gir Amrut Ghee | Premium A2 Gir Cow Vedic Bilona Ghee" />
        <meta property="og:description" content="Handcrafted Vedic Bilona A2 Ghee from desi Gir cows. Grainy texture, authentic taste, direct from our Phaltan farm." />
        <meta property="og:image" content="https://sawaighee.com/assets/logo.jpeg" />
        <meta property="og:url" content="https://sawaighee.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="pattern-overlay" style={{ position: 'absolute', inset: 0 }} />
        <div className="hero-container">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* LOGO BADGE */}
            <div className="hero-badge">
              <img src={logovittiba} alt="Vithoba Ventures" className="hero-badge-logo" />
              <span>✦ Vithoba Ventures Presents ✦</span>
            </div>

            {/* TITLE */}
            <h1 className="hero-title">
              <span>Sawai</span>
              <br />
              Gir Amrut
              <br />
              Ghee
            </h1>

            {/* TAGLINE */}
            <p className="hero-tagline">
              A legacy of purity | The royal taste of real ghee..!
            </p>

            {/* DESCRIPTION */}
            <p className="hero-description">
              Pure A2 Gir Cow Ghee made with the traditional Vedic Bilona method. Crafted at Sawai Gir Farm, Phaltan — where heritage meets purity in every golden drop.
            </p>

            {/* BUTTONS */}
            <div className="hero-buttons">
              <button className="btn-gold" onClick={() => navigate('/products')}>
                Shop Now →
              </button>
              <button className="btn-outline-gold" onClick={() => navigate('/wholesale')}>
                Wholesale Inquiry
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="trust-badges">
              {['500+ Happy Families', '100% A2 Certified', 'Direct from Farm'].map((b) => (
                <div key={b} className="trust-item">
                  <span className="trust-check">✓</span>
                  <span className="trust-text">{b}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="hero-right"
          >
            <div className="hero-glow" />
            <img src={bgImage1} alt="Sawai Gir Amrut Ghee" className="hero-product-image animate-float" />
          </motion.div>
        </div>

        <style>{`
          .hero-section {
            background: linear-gradient(135deg, #0a2819 0%, #0f3a2a 50%, #134630 100%);
            min-height: 92vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
            border-bottom: 2px solid #c9952a;
          }
          .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 5rem 1.5rem;
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 4rem;
            align-items: center;
            width: 100%;
            position: relative;
            z-index: 2;
          }
          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 14px;
            border: 1px solid #c9952a;
            color: #e4b84a;
            font-size: 0.8rem;
            letter-spacing: 2px;
            padding: 10px 20px;
            margin-bottom: 1.5rem;
            text-transform: uppercase;
            border-radius: 50px;
            background: rgba(15, 58, 42, 0.6);
            backdrop-filter: blur(10px);
            box-shadow: 0 0 25px rgba(201,149,42,0.15);
          }
          .hero-badge-logo {
            width: 48px;
            height: 48px;
            object-fit: cover;
            border-radius: 50%;
            background: #fff;
            padding: 2px;
            border: 1.5px solid #c9952a;
            flex-shrink: 0;
          }
          .hero-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(2.8rem, 5vw, 4.8rem);
            line-height: 1.05;
            color: #fff;
            margin-bottom: 0.7rem;
            font-weight: 700;
          }
          .hero-title span {
            color: #e4b84a;
          }
          .hero-tagline {
            color: #f5ead0;
            font-size: 1.25rem;
            font-style: italic;
            font-family: 'Cormorant Garamond', serif;
            margin-bottom: 1.25rem;
          }
          .hero-description {
            color: rgba(255,255,255,0.7);
            font-size: 0.96rem;
            line-height: 1.8;
            margin-bottom: 2.25rem;
            max-width: 480px;
          }
          .hero-buttons {
            display: flex;
            gap: 1.2rem;
            flex-wrap: wrap;
          }
          .trust-badges {
            display: flex;
            gap: 2rem;
            margin-top: 2.5rem;
            flex-wrap: wrap;
          }
          .trust-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .trust-check {
            color: #e4b84a;
            font-weight: bold;
          }
          .trust-text {
            color: rgba(255,255,255,0.6);
            font-size: 0.8rem;
          }
          .hero-right {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .hero-glow {
            position: absolute;
            width: 380px;
            height: 380px;
            background: radial-gradient(circle, rgba(201,149,42,0.2) 0%, transparent 70%);
            border-radius: 50%;
          }
          .hero-product-image {
            width: 100%;
            max-width: 360px;
            object-fit: contain;
            position: relative;
            z-index: 2;
            filter: drop-shadow(0 20px 35px rgba(0,0,0,0.35));
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @media(max-width: 768px) {
            .hero-container {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 2.5rem;
              padding: 4rem 1rem;
            }
            .hero-right { order: -1; }
            .hero-description { margin: 0 auto 2rem auto; }
            .hero-buttons { justify-content: center; }
            .trust-badges { justify-content: center; gap: 1rem; }
            .hero-badge { width: 100%; justify-content: center; }
            .hero-product-image { max-width: 240px; }
          }
        `}</style>
      </section>

      {/* WHY CHOOSE US (FEATURES) */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.7), rgba(15, 15, 15, 0.7)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '6rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-tag">✦ Why Choose Sawai ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: '#fff',
              marginBottom: '3.5rem',
              fontWeight: 600,
            }}
          >
            A legacy of purity passed down through generations
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="gold-top"
                style={{
                  background: 'rgba(15, 58, 42, 0.75)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201, 149, 42, 0.2)',
                  padding: '2.5rem 1.75rem',
                  textAlign: 'center',
                  borderRadius: '12px',
                  position: 'relative',
                }}
              >
                <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'center' }}>
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.35rem',
                    color: '#e4b84a',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#f5ead0', lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--cream-light)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-tag">✦ Pure Ghee Offerings ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: 'var(--green-dark)',
              marginBottom: '3.5rem',
              fontWeight: 600,
            }}
          >
            Explore Our Traditional Vedic Packages
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} dark={false} />
            ))}
          </div>
        </div>
      </section>

      {/* VEDIC BILONA COMPARISON SECTION */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--cream)', borderTop: '1px solid rgba(201, 149, 42, 0.2)', borderBottom: '1px solid rgba(201, 149, 42, 0.2)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="section-tag">✦ The Bilona Difference ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: 'var(--green-dark)',
              marginBottom: '3.5rem',
              fontWeight: 600,
            }}
          >
            Vedic Bilona Ghee vs. Commercial Ghee
          </h2>

          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(201,149,42,0.3)', background: 'rgba(253, 246, 227, 0.8)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'var(--green-dark)', color: '#e4b84a', borderBottom: '2px solid #c9952a' }}>
                  <th style={{ padding: '16px 20px', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Feature</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Sawai Gir Amrut Ghee</th>
                  <th style={{ padding: '16px 20px', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Commercial Ghee</th>
                </tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(201, 149, 42, 0.15)', background: idx % 2 === 0 ? 'transparent' : 'rgba(245, 234, 208, 0.4)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--green-dark)' }}>{row.feature}</td>
                    <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: '#1a5c3e', fontWeight: 500 }}>✓ {row.us}</td>
                    <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>✗ {row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--cream-light)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="section-tag">✦ Client Stories ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: 'var(--green-dark)',
              marginBottom: '3.5rem',
              fontWeight: 600,
            }}
          >
            Loved by Health-Conscious Families
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid #ede0b8',
                  padding: '2.5rem 2rem',
                  borderRadius: '12px',
                  boxShadow: '0 10px 24px rgba(74, 56, 32, 0.04)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '4px', color: '#e4b84a', marginBottom: '1.25rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    “{t.text}”
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-dark)', color: '#e4b84a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--green-dark)', margin: 0 }}>{t.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}