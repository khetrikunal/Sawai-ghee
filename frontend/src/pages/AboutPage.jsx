
import React from 'react'
import { motion } from 'framer-motion'
import GheeJar from '../components/GheeJar'
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
    <div>

      {/* Top Header */}
      <div
        style={{
          background: '#0f3a2a',
          padding: '4rem 1.5rem 3rem',
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
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '0.5rem'
          }}
        >
          Our Story
        </motion.h1>

        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem'
          }}
        >
          The pure taste of tradition, the true belief in health
        </p>
      </div>

     {/* Brand Story Section */}
<section
 style={{
    backgroundImage: `
      linear-gradient(
        rgba(15,58,42,0.88),
        rgba(26,74,46,0.88)
      ),
      url(${bgImage1})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '5rem 1.5rem',
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
          borderRadius: '28px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          border: '2px solid rgba(201,149,42,0.25)',
          background: '#ffffff07',
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
          marginTop: '1.5rem',
          textAlign: 'center',
        }}
      >

        <h3
          style={{
            color: '#e4b84a',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.8rem',
            marginBottom: '0.5rem',
          }}
        >
          Sawai Gir Farm
        </h3>

        <p
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: '0.9rem',
            lineHeight: 1.8,
            maxWidth: 500,
            margin: '0 auto',
          }}
        >
          Located in Malwadi, Phaltan, Satara — our farm is home
          to pure-bred Gir cows raised with love, care, and
          traditional Indian values. Every drop of ghee reflects
          our commitment to purity and heritage.
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
          borderLeft: '3px solid #c9952a',
          paddingLeft: 12,
          color: '#e4b84a',
          fontSize: '0.68rem',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}
      >
        Our Heritage
      </div>

      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
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
        Sawai Gir Amrut Ghee was born from a deep reverence
        for India’s ancestral wisdom and authentic dairy
        traditions.
      </p>

      <p
        style={{
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.9,
          fontSize: '0.95rem',
          marginBottom: '1rem',
        }}
      >
        Using the ancient Vedic Bilona method, we create
        pure A2 Gir Cow Ghee that preserves nutrition,
        aroma, and authenticity in every golden spoon.
      </p>

      <p
        style={{
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.9,
          fontSize: '0.95rem',
        }}
      >
        Every jar carries the trust of generations and
        the promise of purity for modern families.
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
          ['100%', 'Pure A2'],
        ].map(([n, l]) => (
          <div key={l}>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#e4b84a',
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              {n}
            </div>

            <div
              style={{
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.55)',
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
      height:600px;
      object-fit:contain;
      display:block;
      background:#fff;
    }

    @media(max-width:768px){

      .about-container{
        grid-template-columns:1fr !important;
        gap:3rem !important;
      }

      .founder-image{
        height:auto;
        max-height:500px;
      }

    }

  `}</style>
</section>
    </div>
  )
}
