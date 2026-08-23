import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import ProductCard from '../components/ProductCard'
import { productAPI } from '../utils/api'
import bgImage from '../assets/bottels.jpeg'
import logovittiba from '../assets/vittho.jpeg'
import '../styles/hero.css'

// Public-folder assets — served statically by Vite, no import needed
const heroVideo = '/backgroundVideo.mp4'
const bgImage1 = '/bottel (3).jpeg'





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
      <section className="hero-section" style={{ backgroundColor: '#071a12' }}>
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
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
              <img src={logovittiba} alt="Vituraya Ventures" className="hero-badge-logo" />
              <span>✦ Vituraya Ventures Presents ✦</span>
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
              Pure A2 Gir Cow Ghee made with the traditional Vedic Bilona method. Handcrafted at Sawai Gir Farm, Phaltan — where sacred heritage meets uncompromised purity in every golden drop.
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
            <img
              src={bgImage1}
              alt="Sawai Gir Amrut Ghee - Premium A2 Gir Cow Ghee Bottle"
              className="hero-product-image animate-float"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = '/fallback.png'
              }}
            />
          </motion.div>
        </div>

        <style>{`
          /* hero specific inline styles */
          .hero-container {
            max-width: 1360px;
            margin: 0 auto;
            padding: 6.5rem 2rem;
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 4.5rem;
            align-items: center;
            width: 100%;
            position: relative;
            z-index: 2;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-float {
              animation: none;
            }
          }
          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 16px;
            border: 1.5px solid #c9952a;
            color: #e4b84a;
            font-size: 0.95rem;
            font-weight: 600;
            letter-spacing: 2.2px;
            padding: 12px 26px;
            margin-bottom: 2rem;
            text-transform: uppercase;
            border-radius: 50px;
            background: rgba(15, 58, 42, 0.75);
            backdrop-filter: blur(12px);
            box-shadow: 0 0 30px rgba(201,149,42,0.22);
          }
          .hero-badge-logo {
            width: 56px;
            height: 56px;
            object-fit: cover;
            border-radius: 50%;
            background: #fff;
            padding: 3px;
            border: 2px solid #c9952a;
            flex-shrink: 0;
          }
          .hero-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(3.4rem, 6.2vw, 5.8rem);
            line-height: 1.04;
            color: #fff;
            margin-bottom: 1rem;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .hero-title span {
            color: #e4b84a;
          }
          .hero-tagline {
            color: #f5ead0;
            font-size: 1.55rem;
            font-style: italic;
            font-family: 'Cormorant Garamond', serif;
            margin-bottom: 1.5rem;
            letter-spacing: 0.5px;
          }
          .hero-description {
            color: rgba(255,255,255,0.82);
            font-size: 1.12rem;
            line-height: 1.85;
            margin-bottom: 2.6rem;
            max-width: 560px;
          }
          .hero-buttons {
            display: flex;
            gap: 1.4rem;
            flex-wrap: wrap;
          }
          .trust-badges {
            display: flex;
            gap: 2.5rem;
            margin-top: 3rem;
            flex-wrap: wrap;
          }
          .trust-item {
            display: flex;
            align-items: center;
            gap: 0.65rem;
          }
          .trust-check {
            color: #e4b84a;
            font-weight: 800;
            font-size: 1.2rem;
          }
          .trust-text {
            color: rgba(255,255,255,0.85);
            font-size: 0.98rem;
            font-weight: 500;
            letter-spacing: 0.3px;
          }
          .hero-right {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .hero-glow {
            position: absolute;
            width: 480px;
            height: 480px;
            background: radial-gradient(circle, rgba(201,149,42,0.3) 0%, transparent 70%);
            border-radius: 50%;
          }
          .hero-product-image {
            width: 100%;
            max-width: 480px;
            object-fit: contain;
            position: relative;
            z-index: 2;
            filter: drop-shadow(0 25px 45px rgba(0,0,0,0.45));
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-14px); }
          }
          @media(max-width: 960px) {
            .hero-container {
              grid-template-columns: 1fr;
              text-align: center;
              gap: 3.5rem;
              padding: 5rem 1.5rem;
            }
            .hero-right { order: -1; }
            .hero-description { margin: 0 auto 2.5rem auto; }
            .hero-buttons { justify-content: center; }
            .trust-badges { justify-content: center; gap: 1.5rem; }
            .hero-badge { width: auto; justify-content: center; }
            .hero-product-image { max-width: 340px; }
            .hero-glow { width: 340px; height: 340px; }
          }
        `}</style>
      </section>

      {/* WHY CHOOSE US (FEATURES) */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.75), rgba(15, 15, 15, 0.75)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '7rem 1.75rem',
        }}
      >
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div className="section-tag">✦ Why Choose Sawai ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
              color: '#fff',
              marginBottom: '4rem',
              fontWeight: 700,
              letterSpacing: '-0.3px',
            }}
          >
            A legacy of purity passed down through generations
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="gold-top"
                style={{
                  background: 'rgba(15, 58, 42, 0.82)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(201, 149, 42, 0.3)',
                  padding: '3rem 2.25rem',
                  textAlign: 'center',
                  borderRadius: '16px',
                  position: 'relative',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', transform: 'scale(1.15)' }}>
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.65rem',
                    color: '#e4b84a',
                    marginBottom: '1rem',
                    fontWeight: 700,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: '1.02rem', color: '#f5ead0', lineHeight: 1.8 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '7rem 1.75rem', backgroundColor: 'var(--cream-light)' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div className="section-tag">✦ Pure Ghee Offerings ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
              color: 'var(--green-dark)',
              marginBottom: '4rem',
              fontWeight: 700,
            }}
          >
            Explore Our Traditional Vedic Packages
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} dark={false} />
            ))}
          </div>
        </div>
      </section>

      {/* VEDIC BILONA COMPARISON SECTION */}
      <section style={{ padding: '7rem 1.75rem', backgroundColor: 'var(--cream)', borderTop: '2px solid rgba(201, 149, 42, 0.3)', borderBottom: '2px solid rgba(201, 149, 42, 0.3)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="section-tag">✦ The Bilona Difference ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
              color: 'var(--green-dark)',
              marginBottom: '4rem',
              fontWeight: 700,
            }}
          >
            Vedic Bilona Ghee vs. Commercial Ghee
          </h2>

          <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1.5px solid rgba(201,149,42,0.35)', background: 'rgba(253, 246, 227, 0.9)', boxShadow: '0 15px 40px rgba(74, 56, 32, 0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--green-dark)', color: '#e4b84a', borderBottom: '2.5px solid #c9952a' }}>
                  <th style={{ padding: '20px 24px', fontSize: '1.02rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>Feature</th>
                  <th style={{ padding: '20px 24px', fontSize: '1.02rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>Sawai Gir Amrut Ghee</th>
                  <th style={{ padding: '20px 24px', fontSize: '1.02rem', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700 }}>Commercial Ghee</th>
                </tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(201, 149, 42, 0.2)', background: idx % 2 === 0 ? 'transparent' : 'rgba(245, 234, 208, 0.5)' }}>
                    <td style={{ padding: '20px 24px', fontWeight: 700, fontSize: '1.02rem', color: 'var(--green-dark)' }}>{row.feature}</td>
                    <td style={{ padding: '20px 24px', fontSize: '1.02rem', color: '#1a5c3e', fontWeight: 600 }}>✓ {row.us}</td>
                    <td style={{ padding: '20px 24px', fontSize: '1.02rem', color: 'var(--text-muted)' }}>✗ {row.other}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '7rem 1.75rem', backgroundColor: 'var(--cream-light)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-tag">✦ Client Stories ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
              color: 'var(--green-dark)',
              marginBottom: '4rem',
              fontWeight: 700,
            }}
          >
            Loved by Health-Conscious Families
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede0b8',
                  padding: '3rem 2.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 14px 32px rgba(74, 56, 32, 0.06)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '5px', color: '#e4b84a', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '1.08rem', color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '2rem' }}>
                    “{t.text}”
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--green-dark)', color: '#e4b84a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.05rem', flexShrink: 0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--green-dark)', margin: 0 }}>{t.name}</h4>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>{t.loc}</span>
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