import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import bgImage from '../assets/founder1.png'
import bgImage1 from '../assets/bottels.jpeg'

const STEPS = [
  {
    n: '01',
    t: 'Fresh A2 Milk Collection',
    d: 'Collected every morning from our pure-bred Gir cows, each batch is tested for purity and quality before any processing begins.'
  },
  {
    n: '02',
    t: 'Natural Curd Formation (Dahi)',
    d: 'Milk is cultured with natural starter cultures and set overnight to form thick, creamy, naturally fermented curd.'
  },
  {
    n: '03',
    t: 'Bilona Churning (Loni)',
    d: 'The curd is churned with a traditional wooden bilona (churner) to gently separate fresh white butter — called loni — from the buttermilk.'
  },
  {
    n: '04',
    t: 'Slow Simmer to Pure Ghee',
    d: 'The loni is heated on a gentle, low flame for hours until pure golden ghee separates — preserving all natural nutrients, CLA, and the authentic aroma.'
  },
]

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--cream-light)', color: 'var(--text)' }}>
      <Helmet>
        <title>Our Story & Bilona Ghee Method | Sawai Ghee</title>
        <meta name="description" content="Learn about our heritage at Vithoba Ventures and the traditional Vedic Bilona method we use to prepare A2 Gir Cow Ghee on our farm in Phaltan, Maharashtra." />
        <meta name="keywords" content="Vedic bilona process, Gir cow ghee story, organic farm Phaltan Satara, Vithoba Ventures, about Sawai ghee" />
        <link rel="canonical" href="https://sawaighee.com/about" />
        <meta property="og:title" content="Our Story & Bilona Ghee Method | Sawai Ghee" />
        <meta property="og:description" content="Handcrafting A2 Gir Cow Ghee through the ancient Bilona method. Learn about our Satara farm." />
        <meta property="og:url" content="https://sawaighee.com/about" />
      </Helmet>
      {/* Top Header */}
      <div
        style={{
          background: '#0f3a2a',
          padding: '5rem 1.5rem 4rem',
          textAlign: 'center',
          borderBottom: '2px solid #c9952a'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#fdf6e3',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '0.5rem'
          }}
        >
          Our Story
        </motion.h1>

        <p
          style={{
            color: '#ede0b8',
            fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.25rem'
          }}
        >
          The pure taste of tradition, the true belief in health
        </p>
      </div>

      {/* Brand Story Section */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(15,58,42,0.92), rgba(26,74,46,0.92)), url(${bgImage1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '6rem 1.5rem',
        }}
      >
        <div
          className="about-container"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* LEFT SIDE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              width: '100%',
            }}
          >
            {/* IMAGE CARD */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                border: '1.5px solid rgba(201,149,42,0.3)',
                background: '#ffffff05',
              }}
            >
              <img
                src={bgImage}
                alt="Founder"
                className="founder-image"
              />
            </div>

            {/* DESCRIPTION BELOW IMAGE */}
            <div
              style={{
                marginTop: '1.75rem',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  color: '#e4b84a',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Sawai Gir Farm
              </h3>

              <p
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.92rem',
                  lineHeight: 1.8,
                  maxWidth: 500,
                  margin: '0 auto',
                }}
              >
                Located in Malwadi, Phaltan, Satara — our farm is home to pure-bred Gir cows raised with love, care, and traditional Indian values. Every drop of ghee reflects our commitment to purity and heritage.
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                color: '#e4b84a',
                fontSize: '0.75rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>✦</span> Our Heritage
            </div>

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                fontWeight: 700,
              }}
            >
              Rooted in Tradition,
              <br />
              Crafted with Love
            </h2>

            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.9,
                fontSize: '0.95rem',
                marginBottom: '1rem',
              }}
            >
              Sawai Gir Amrut Ghee was born from a deep reverence for India’s ancestral wisdom and authentic dairy traditions.
            </p>

            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.9,
                fontSize: '0.95rem',
                marginBottom: '1rem',
              }}
            >
              Using the ancient Vedic Bilona method, we create pure A2 Gir Cow Ghee that preserves nutrition, aroma, and authenticity in every golden spoon.
            </p>

            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.9,
                fontSize: '0.95rem',
              }}
            >
              Every jar carries the trust of generations and the promise of purity for modern families.
            </p>

            {/* STATS */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                marginTop: '2.5rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                ['500+', 'Happy Families'],
                ['5+', 'Years Experience'],
                ['100%', 'Pure A2 Ghee'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 700,
                      color: '#e4b84a',
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {n}
                  </div>

                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RESPONSIVE CSS */}
        <style>{`
          .founder-image{
            width:100%;
            height:540px;
            object-fit:cover;
            display:block;
            background:#fff;
          }

          @media(max-width:768px){
            .about-container{
              grid-template-columns:1fr !important;
              gap:3.5rem !important;
            }

            .founder-image{
              height:auto;
              max-height:400px;
            }
          }
        `}</style>
      </section>

      {/* BILONA PROCESS SECTION */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--cream)', borderTop: '1px solid rgba(201, 149, 42, 0.15)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="section-tag">✦ Our Churning Process ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: 'var(--green-dark)',
              marginBottom: '4.5rem',
              fontWeight: 600,
            }}
          >
            The Traditional Vedic Bilona Method
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(201, 149, 42, 0.2)',
                  borderRadius: '12px',
                  padding: '2.5rem 1.5rem 2rem',
                  position: 'relative',
                  boxShadow: '0 8px 24px rgba(74, 56, 32, 0.03)',
                }}
              >
                <div style={{ 
                  position: 'absolute', 
                  top: '-1.5rem', 
                  left: '1.5rem', 
                  background: '#c9952a', 
                  color: '#0f3a2a', 
                  width: 44, 
                  height: 44, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700, 
                  fontSize: '1.1rem', 
                  border: '3px solid var(--cream)' 
                }}>
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.25rem',
                    color: 'var(--green-dark)',
                    marginTop: '0.5rem',
                    marginBottom: '0.6rem',
                    fontWeight: 600,
                  }}
                >
                  {s.t}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
