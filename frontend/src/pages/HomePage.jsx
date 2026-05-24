import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { productAPI } from '../utils/api'
import bgImage from '../assets/bottels.jpeg'
import logovittiba from '../assets/vittho.jpeg'
import bgImage1 from '../assets/bottel.jpeg'
const FEATURES = [
  {
    icon: '🐄',
    title: '100% A2 Gir Cow',
    desc: 'Sourced exclusively from pure-bred Gir cows raised at our Phaltan farm — the gold standard of desi cow breeds.',
  },
  {
    icon: '🪵',
    title: 'Vedic Bilona Method',
    desc: 'Curd churned with a traditional wooden bilona, then slow-simmered on low flame to preserve all natural nutrients.',
  },
  {
    icon: '🚫',
    title: 'No Preservatives',
    desc: 'Zero artificial colors, flavors, or preservatives. Pure, natural ghee as nature and tradition intended.',
  },
  {
    icon: '✨',
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
    stars: 5,
  },
  {
    text: "This is the closest I have found to my grandmother's ghee. The aroma, color, and grainy texture are exactly right. Highly recommended for every family!",
    name: 'Ramesh Patil',
    loc: 'Nashik',
    initials: 'RP',
    stars: 5,
  },
  {
    text: 'I ordered the 5L bulk pack for our restaurant and customer feedback has been outstanding. The ghee enhances every dish beautifully. Regular customer now!',
    name: 'Suresh Mehta',
    loc: 'Mumbai',
    initials: 'SM',
    stars: 5,
  },
]

const COMP_ROWS = [
  ['Milk Source', 'Pure A2 Gir Cow Milk', 'Mixed / A1 foreign milk'],
  ['Production', 'Traditional Vedic Bilona (from curd)', 'Industrial cream method'],
  ['Nutrients', 'Vitamins A, D, E, K, CLA, Omega-3', 'Reduced due to high heat'],
  ['Digestibility', 'Light, gut-friendly, anti-acidic', 'Can be heavy, may cause acidity'],
  ['Color & Texture', 'Natural golden, grainy', 'Often pale yellow, smooth'],
  ['Aroma', 'Pure, rich, traditional home-ghee', 'Mild or artificial flavoring'],
  ['Preservatives', 'None — 100% natural', 'Often added'],
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
          { id: 1, name: 'Sawai Gir Amrut Ghee', size: '200 ml', price: 640 },
          { id: 2, name: 'Sawai Gir Amrut Ghee', size: '500 ml', price: 1600 },
          { id: 3, name: 'Sawai Gir Amrut Ghee', size: '1 Litre', price: 3200 },
        ])
      })
  }, [])

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div
          className="pattern-overlay"
          style={{ position: 'absolute', inset: 0 }}
        />

        <div className="hero-container">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* LOGO BADGE */}
            <div className="hero-badge">
              <img
                src={logovittiba}
                alt="Vithoba Ventures"
                className="hero-badge-logo"
              />

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
              Pure A2 Gir Cow Ghee made with the traditional Vedic Bilona
              method. Crafted at Sawai Gir Farm, Phaltan — where tradition
              meets purity in every golden drop.
            </p>

            {/* BUTTONS */}
            <div className="hero-buttons">
              <button
                className="btn-gold"
                onClick={() => navigate('/products')}
              >
                Shop Now →
              </button>

              <button
                className="btn-outline-gold"
                onClick={() => navigate('/wholesale')}
              >
                Wholesale Inquiry
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="trust-badges">
              {[
                '500+ Happy Families',
                '100% A2 Certified',
                'Direct from Farm',
              ].map((b) => (
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
            {/* GLOW */}
            <div className="hero-glow" />

            {/* PRODUCT IMAGE */}
            <img
              src={bgImage1}
              alt="Sawai Gir Amrut Ghee"
              className="hero-product-image animate-float"
            />
          </motion.div>
        </div>

        {/* CSS */}
        <style>{`

          .hero-section{
            background:linear-gradient(
              135deg,
              #0a2819 0%,
              #0f3a2a 50%,
              #1a4a2e 100%
            );
            min-height:92vh;
            display:flex;
            align-items:center;
            position:relative;
            overflow:hidden;
          }

          .hero-container{
            max-width:1200px;
            margin:0 auto;
            padding:5rem 1.5rem;
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:4rem;
            align-items:center;
            width:100%;
            position:relative;
            z-index:2;
          }

          .hero-badge{
            display:inline-flex;
            align-items:center;
            gap:14px;
            border:1px solid #c9952a;
            color:#e4b84a;
            font-size:0.82rem;
            letter-spacing:2px;
            padding:12px 22px;
            margin-bottom:1.5rem;
            text-transform:uppercase;
            border-radius:50px;
            background:rgba(255,255,255,0.04);
            backdrop-filter:blur(5px);
            box-shadow:0 0 25px rgba(201,149,42,0.15);
            flex-wrap:wrap;
          }

          .hero-badge-logo{
            width:58px;
            height:58px;
            object-fit:cover;
            border-radius:50%;
            background:#fff;
            padding:3px;
            border:2px solid #c9952a;
            flex-shrink:0;
          }

          .hero-title{
            font-family:'Cormorant Garamond', serif;
            font-size:clamp(2.8rem, 5vw, 4.8rem);
            line-height:1.05;
            color:#fff;
            margin-bottom:0.7rem;
          }

          .hero-title span{
            color:#e4b84a;
          }

          .hero-tagline{
            color:#f5ead0;
            font-size:1.2rem;
            font-style:italic;
            font-family:'Cormorant Garamond', serif;
            margin-bottom:1.25rem;
          }

          .hero-description{
            color:rgba(255,255,255,0.65);
            font-size:0.96rem;
            line-height:1.8;
            margin-bottom:2.25rem;
            max-width:460px;
          }

          .hero-buttons{
            display:flex;
            gap:1rem;
            flex-wrap:wrap;
          }

          .trust-badges{
            display:flex;
            gap:2rem;
            margin-top:2.5rem;
            flex-wrap:wrap;
          }

          .trust-item{
            display:flex;
            align-items:center;
            gap:0.4rem;
          }

          .trust-check{
            color:#c9952a;
            font-size:0.8rem;
          }

          .trust-text{
            color:rgba(255,255,255,0.55);
            font-size:0.78rem;
          }

          .hero-right{
            display:flex;
            justify-content:center;
            align-items:center;
            position:relative;
          }

          .hero-glow{
            position:absolute;
            width:380px;
            height:380px;
            background:radial-gradient(
              circle,
              rgba(201,149,42,0.2) 0%,
              transparent 70%
            );
            border-radius:50%;
          }

          .hero-product-image{
            width:100%;
            max-width:420px;
            object-fit:contain;
            position:relative;
            z-index:2;
            filter:drop-shadow(0 20px 35px rgba(0,0,0,0.35));
          }

          .animate-float{
            animation:float 4s ease-in-out infinite;
          }

          @keyframes float{
            0%{
              transform:translateY(0px);
            }
            50%{
              transform:translateY(-15px);
            }
            100%{
              transform:translateY(0px);
            }
          }

          @media(max-width:768px){

            .hero-container{
              grid-template-columns:1fr;
              text-align:center;
              gap:2rem;
              padding:4rem 1rem;
            }

            .hero-right{
              order:-1;
            }

            .hero-title{
              font-size:2.8rem;
            }

            .hero-tagline{
              font-size:1rem;
            }

            .hero-description{
              margin:0 auto 2rem auto;
              font-size:0.9rem;
            }

            .hero-buttons{
              justify-content:center;
            }

            .trust-badges{
              justify-content:center;
              gap:1rem;
            }

            .hero-badge{
              justify-content:center;
              width:100%;
              padding:10px 16px;
              font-size:0.65rem;
            }

            .hero-badge-logo{
              width:46px;
              height:46px;
            }

            .hero-glow{
              width:260px;
              height:260px;
            }

            .hero-product-image{
              max-width:260px;
            }
          }

        `}</style>
      </section>

      {/* FEATURES */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.65), rgba(15, 15, 15, 0.65)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '5rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-tag">
            ✦ Why Choose Sawai ✦
          </div>

          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              color: '#fff',
              marginBottom: '3rem',
            }}
          >
            “A legacy of purity passed down through generations.”
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="gold-top"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  borderRadius: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                  }}
                >
                  {f.icon}
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.25rem',
                    color: '#e4b84a',
                    marginBottom: '0.6rem',
                  }}
                >
                  {f.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.65,
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}