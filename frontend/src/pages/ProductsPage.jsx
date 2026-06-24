import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import ProductCard from '../components/ProductCard'
import { productAPI } from '../utils/api'
import productImage from '../assets/bottels.jpeg'
import product from '../assets/bottel (3).jpeg'


const FALLBACK = [
  {
    id: 1,
    name: 'Sawai Gir Amrut Ghee',
    size: '200 ml',
    price: 640,
    image: product,
  },
  {
    id: 2,
    name: 'Sawai Gir Amrut Ghee',
    size: '500 ml',
    price: 1600,
    image: product,
  },
  {
    id: 3,
    name: 'Sawai Gir Amrut Ghee',
    size: '1 Litre',
    price: 3200,
    image: product,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    if (searchQuery.trim() === '') {
      productAPI
        .getAll({ active: true })
        .then((r) => setProducts(r.data))
        .catch(() => setProducts(FALLBACK))
        .finally(() => setLoading(false))
    } else {
      const delayDebounce = setTimeout(() => {
        productAPI
          .search(searchQuery)
          .then((r) => setProducts(r.data))
          .catch(() => {
            const filtered = FALLBACK.filter(p =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.size.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setProducts(filtered)
          })
          .finally(() => setLoading(false))
      }, 300)
      return () => clearTimeout(delayDebounce)
    }
  }, [searchQuery])

  return (
    <div>
      <Helmet>
        <title>Desi Gir Cow A2 Ghee Shop | Sawai Ghee</title>
        <meta name="description" content="Browse our collection of authentic, laboratory-tested A2 Gir Cow Vedic Bilona Ghee. Handcrafted in Satara in small batches. Available in 500ml, 1L, and 5L packs." />
        <meta name="keywords" content="buy A2 ghee, Gir cow ghee 1 litre, Vedic bilona ghee 500ml, organic ghee price, pure ghee Maharashtra" />
        <link rel="canonical" href="https://sawaighee.com/products" />
        <meta property="og:title" content="Desi Gir Cow A2 Ghee Shop | Sawai Ghee" />
        <meta property="og:description" content="Authentic Vedic Bilona A2 Ghee. Choose from 500ml, 1L, or 5L premium glass jars." />
        <meta property="og:url" content="https://sawaighee.com/products" />
      </Helmet>
      {/* PAGE HERO */}
      <div
        style={{
          background:
            'linear-gradient(135deg, #0a2819 0%, #0f3a2a 50%, #1a4a2e 100%)',
          padding: '5rem 1.5rem 4rem',
          borderBottom: '2px solid #c9952a',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="products-hero-grid"
        >
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div
              style={{
                display: 'inline-block',
                border: '1px solid #c9952a',
                color: '#e4b84a',
                padding: '10px 18px',
                borderRadius: '50px',
                fontSize: '0.75rem',
                letterSpacing: '2px',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              ✦ Premium Bilona Collection ✦
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#fdf6e3',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}
            >
              Our Premium
              <br />
              Ghee Products
            </motion.h1>

            <p
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.95rem',
                lineHeight: 1.8,
                maxWidth: 500,
              }}
            >
              Explore our handcrafted range of pure A2 Gir Cow Ghee,
              prepared using the traditional Vedic Bilona method to
              preserve authentic aroma, nutrition, and taste.
            </p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 380,
                height: 380,
                background:
                  'radial-gradient(circle, rgba(201,149,42,0.25) 0%, transparent 70%)',
                borderRadius: '50%',
              }}
            />

            {/* PRODUCT IMAGE */}
            <img
              src={productImage}
              alt="Sawai Gir Amrut Ghee"
              className="hero-product-image"
            />
          </motion.div>
        </div>

        {/* RESPONSIVE CSS */}
        <style>{`
          .hero-product-image{
            width:100%;
            max-width:420px;
            object-fit:contain;
            position:relative;
            z-index:2;
            filter:drop-shadow(0 20px 35px rgba(0,0,0,0.35));
            animation:float 4s ease-in-out infinite;
          }

          @keyframes float{
            0%{
              transform:translateY(0px);
            }
            50%{
              transform:translateY(-12px);
            }
            100%{
              transform:translateY(0px);
            }
          }

          @media(max-width:768px){
            .products-hero-grid{
              grid-template-columns:1fr !important;
              text-align:center;
            }

            .hero-product-image{
              max-width:260px;
              margin-top:2rem;
            }
          }
        `}</style>
      </div>

      {/* PRODUCTS SECTION */}
      <section
        style={{
          background: '#fdf6e3',
          padding: '4rem 1.5rem',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* INFO STRIP */}
          <div
            style={{
              background: '#0f3a2a',
              padding: '1rem 1.5rem',
              marginBottom: '3rem',
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              borderRadius: '12px',
            }}
          >
            {[
              '100% A2 Gir Cow Milk',
              'Traditional Bilona Method',
              'No Preservatives',
              'Direct from Farm',
            ].map((b) => (
              <div
                key={b}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: '#c9952a' }}>✓</span>

                <span
                  style={{
                    color: '#f5ead0',
                    fontSize: '0.82rem',
                    letterSpacing: '1px',
                  }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* SEARCH BAR */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '100%', maxWidth: 500, position: 'relative' }}>
              <input
                type="text"
                placeholder="Search premium ghee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid rgba(201, 149, 42, 0.3)',
                  padding: '12px 20px 12px 48px',
                  borderRadius: '30px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.95rem',
                  outline: 'none',
                  color: '#0f3a2a',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#c9952a'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(201, 149, 42, 0.3)'}
              />
              <span style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: '#c9952a', fontSize: '1.1rem' }}>🔍</span>
            </div>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {[1, 2, 3].map((n) => (
                <div key={n} style={{ background: '#fff', border: '1px solid rgba(201, 149, 42, 0.15)', borderRadius: '18px', padding: '1.5rem', height: 400, display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
                  <div style={{ height: 220, background: 'rgba(0,0,0,0.03)', borderRadius: '12px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                  <div style={{ height: 24, width: '70%', background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                  <div style={{ height: 16, width: '40%', background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                    <div style={{ height: 30, width: '30%', background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                    <div style={{ height: 38, width: '100%', background: 'rgba(0,0,0,0.03)', borderRadius: '10px', animation: 'pulse 1.5s infinite ease-in-out' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#0f3a2a' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌾</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600 }}>No products found</h3>
              <p style={{ opacity: 0.7 }}>Try searching for a different term.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
              }}
            >
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={p} dark={false} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}</style>
      </section>
    </div>
  )
}