import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../store'
import toast from 'react-hot-toast'

export default function ProductCard({ product, dark = true }) {
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = (e) => {
    e.stopPropagation()
    addItem(product)
    toast.success(`${product.size} added to cart!`)
  }

  const bg = dark ? 'rgba(255,255,255,0.05)' : '#fff'
  const border = dark
    ? '1px solid rgba(201,149,42,0.3)'
    : '1px solid #ede0b8'

  const nameColor = dark ? '#fdf6e3' : '#1a5c3e'
  const subColor = dark
    ? 'rgba(255,255,255,0.45)'
    : '#7a6040'

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/products/${product.id}`)}
      style={{
        background: bg,
        border,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '18px',
      }}
    >
      {/* IMAGE AREA */}
      <div
        style={{
          height: 220,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: dark
            ? 'rgba(255,255,255,0.03)'
            : '#f5ead0',
          position: 'relative',
          overflow: 'hidden',
          padding: '1rem',
        }}
      >
        {/* GLOW */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, rgba(201,149,42,0.15), transparent 70%)',
          }}
        />

        {/* BADGE */}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: '#c9952a',
              color: '#0f3a2a',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '4px 10px',
              letterSpacing: '1px',
              zIndex: 2,
            }}
          >
            {product.badge}
          </div>
        )}

        {/* PRODUCT IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      {/* BODY */}
      <div style={{ padding: '1.25rem 1.5rem' }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.35rem',
            color: nameColor,
            marginBottom: '0.25rem',
          }}
        >
          {product.name}
        </div>

        <div
          style={{
            fontSize: '0.72rem',
            color: subColor,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          {product.size} · A2 Gir · Bilona
        </div>

        {/* PRICE */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: '1.55rem',
              fontWeight: 700,
              color: '#e4b84a',
            }}
          >
            ₹{product.price?.toLocaleString('en-IN')}
          </span>

          {product.originalPrice && (
            <span
              style={{
                fontSize: '0.85rem',
                color: dark
                  ? 'rgba(255,255,255,0.3)'
                  : '#aba090',
                textDecoration: 'line-through',
              }}
            >
              ₹{product.originalPrice?.toLocaleString('en-IN')}
            </span>
          )}

          {product.discount && (
            <span
              style={{
                fontSize: '0.72rem',
                color: '#4caf50',
                fontWeight: 600,
              }}
            >
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleAdd}
          style={{
            width: '100%',
            background: '#c9952a',
            color: '#0f3a2a',
            border: 'none',
            padding: '11px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            fontSize: '0.78rem',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            textTransform: 'uppercase',
            transition: 'background 0.2s',
            borderRadius: '10px',
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = '#e4b84a')
          }
          onMouseLeave={(e) =>
            (e.target.style.background = '#c9952a')
          }
        >
          Add to Cart
        </button>
      </div>

      {/* CSS */}
      <style>{`
        .product-image{
          width:100%;
          max-width:160px;
          object-fit:contain;
          position:relative;
          z-index:1;
          transition:transform 0.3s ease;
          filter:drop-shadow(0 12px 20px rgba(0,0,0,0.25));
        }

        .product-card:hover .product-image{
          transform:scale(1.06);
        }
      `}</style>
    </motion.div>
  )
}