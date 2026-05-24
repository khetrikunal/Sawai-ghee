import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { productAPI } from '../utils/api'
import productImage from '../assets/bottels.jpeg'
import product from '../assets/bottel.jpeg'


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

  useEffect(() => {
    productAPI
      .getAll({ active: true })
      .then((r) => setProducts(r.data))
      .catch(() => setProducts(FALLBACK))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
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

          {loading ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem',
                color: '#7a6040',
              }}
            >
              Loading products...
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
      </section>
    </div>
  )
}