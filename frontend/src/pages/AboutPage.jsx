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
          padding: '6.5rem 2rem 5rem',
          textAlign: 'center',
          borderBottom: '2.5px solid #c9952a'
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#fdf6e3',
            fontSize: 'clamp(3rem, 6vw, 4.8rem)',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}
        >
          Our Story
        </motion.h1>

        <p
          style={{
            color: '#ede0b8',
            fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.55rem'
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
          padding: '7rem 2rem',
        }}
      >
        <div
          className="about-container"
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5.5rem',
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
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.45)',
                border: '2px solid rgba(201,149,42,0.35)',
                background: '#ffffff05',
              }}
            >
              <img
                src={bgImage}
                alt="Sawai Gir Farm & Founder"
                className="founder-image"
              />
            </div>

            {/* DESCRIPTION BELOW IMAGE */}
            <div
              style={{
                marginTop: '2rem',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  color: '#e4b84a',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.3rem',
                  fontWeight: 700,
                  marginBottom: '0.6rem',
                }}
              >
                Sawai Gir Farm
              </h3>

              <p
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: '1.05rem',
                  lineHeight: 1.85,
                  maxWidth: 540,
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
                fontSize: '0.9rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
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
                fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)',
                color: '#fff',
                lineHeight: 1.08,
                marginBottom: '1.75rem',
                fontWeight: 700,
              }}
            >
              Rooted in Tradition,
              <br />
              Crafted with Love
            </h2>

            <p
              style={{
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.9,
                fontSize: '1.08rem',
                marginBottom: '1.25rem',
              }}
            >
              Sawai Gir Amrut Ghee was born from a deep reverence for India’s ancestral wisdom and authentic dairy traditions.
            </p>

            <p
              style={{
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.9,
                fontSize: '1.08rem',
                marginBottom: '1.25rem',
              }}
            >
              Using the ancient Vedic Bilona method, we create pure A2 Gir Cow Ghee that preserves nutrition, aroma, and authenticity in every golden spoon.
            </p>

            <p
              style={{
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.9,
                fontSize: '1.08rem',
              }}
            >
              Every jar carries the trust of generations and the promise of uncompromised purity for modern families.
            </p>

            {/* STATS */}
            <div
              style={{
                display: 'flex',
                gap: '3rem',
                marginTop: '3rem',
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
                      fontSize: '2.8rem',
                      fontWeight: 800,
                      color: '#e4b84a',
                      fontFamily: "'Cormorant Garamond', serif",
                      lineHeight: 1,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {n}
                  </div>

                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(255,255,255,0.75)',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      fontWeight: 600,
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
            height:560px;
            object-fit:cover;
            display:block;
            background:#fff;
          }

          @media(max-width:960px){
            .about-container{
              grid-template-columns:1fr !important;
              gap:4rem !important;
            }

            .founder-image{
              height:auto;
              max-height:440px;
            }
          }
        `}</style>
      </section>

      {/* BILONA PROCESS SECTION */}
      <section style={{ padding: '7rem 2rem', backgroundColor: 'var(--cream)', borderTop: '2px solid rgba(201, 149, 42, 0.25)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="section-tag">✦ Our Churning Process ✦</div>
          <h2
            style={{
              textAlign: 'center',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
              color: 'var(--green-dark)',
              marginBottom: '5rem',
              fontWeight: 700,
            }}
          >
            The Traditional Vedic Bilona Method
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem' }}>
            {STEPS.map((s) => (
              <div
                key={s.n}
                style={{
                  background: '#fff',
                  border: '1.5px solid rgba(201, 149, 42, 0.25)',
                  borderRadius: '16px',
                  padding: '3rem 2rem 2.25rem',
                  position: 'relative',
                  boxShadow: '0 12px 30px rgba(74, 56, 32, 0.05)',
                }}
              >
                <div style={{ 
                  position: 'absolute', 
                  top: '-1.6rem', 
                  left: '1.75rem', 
                  background: '#c9952a', 
                  color: '#0f3a2a', 
                  width: 52, 
                  height: 52, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 800, 
                  fontSize: '1.25rem', 
                  border: '3.5px solid var(--cream)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}>
                  {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.5rem',
                    color: 'var(--green-dark)',
                    marginTop: '0.6rem',
                    marginBottom: '0.8rem',
                    fontWeight: 700,
                  }}
                >
                  {s.t}
                </h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
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
