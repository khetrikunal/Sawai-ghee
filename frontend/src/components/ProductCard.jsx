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
    const firstVariant = product.variants && product.variants.length > 0 ? product.variants[0] : null
    if (firstVariant) {
      addItem({
        ...product,
        id: firstVariant.id,
        productVariantId: firstVariant.id,
        size: firstVariant.size,
        price: firstVariant.price,
        originalPrice: firstVariant.originalPrice,
        discount: firstVariant.discount,
        stock: firstVariant.stock,
      })
    } else {
      addItem(product)
    }
    toast.success(`${firstVariant ? firstVariant.size : product.size} added to cart!`)
  }

  const bg = dark ? 'rgba(15, 58, 42, 0.75)' : 'rgba(255, 255, 255, 0.95)'
  const border = dark
    ? '1px solid rgba(201, 149, 42, 0.35)'
    : '1px solid rgba(201, 149, 42, 0.22)'

  const nameColor = dark ? '#fdf6e3' : '#0f3a2a'
  const subColor = dark
    ? 'rgba(245, 234, 208, 0.85)'
    : '#4a3820'

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/products/${product.id}`)}
      style={{
        background: bg,
        border,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '20px',
        boxShadow: dark ? '0 12px 36px rgba(0,0,0,0.3)' : '0 12px 36px rgba(74, 56, 32, 0.08)',
      }}
    >
      {/* IMAGE AREA */}
      <div
        style={{
          height: 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: dark
            ? 'rgba(255,255,255,0.03)'
            : '#f5ead0',
          position: 'relative',
          overflow: 'hidden',
          padding: '1.25rem',
        }}
      >
        {/* GLOW */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, rgba(201,149,42,0.2), transparent 70%)',
          }}
        />

        {/* BADGE */}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: '#c9952a',
              color: '#0f3a2a',
              fontSize: '0.8rem',
              fontWeight: 800,
              padding: '6px 14px',
              borderRadius: '20px',
              letterSpacing: '1px',
              zIndex: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {product.badge}
          </div>
        )}

        {/* PRODUCT IMAGE */}
        {(() => {
          const resolvedSrc =
            product?.imageUrl ||
            product?.image ||
            product?.image_url ||
            product?.imagePath ||
            product?.mainImage ||
            (Array.isArray(product?.images) ? product.images[0] : undefined)

          return (
            <img
              src={resolvedSrc || '/fallback.png'}
              alt={product?.name || 'Product'}
              className="product-image"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = '/fallback.png'
              }}
            />
          )
        })()}

      </div>

      {/* BODY */}
      <div style={{ padding: '1.6rem 1.8rem' }}>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.65rem',
            color: nameColor,
            marginBottom: '0.35rem',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </div>

        <div
          style={{
            fontSize: '0.88rem',
            color: subColor,
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            fontWeight: 600,
          }}
        >
          {product.size} · A2 Gir · Bilona
        </div>

        {/* PRICE */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.85rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              color: '#e4b84a',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ₹{product.price?.toLocaleString('en-IN')}
          </span>

          {product.originalPrice && (
            <span
              style={{
                fontSize: '1.05rem',
                color: dark
                  ? 'rgba(255,255,255,0.4)'
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
                fontSize: '0.85rem',
                color: '#4caf50',
                fontWeight: 700,
                background: 'rgba(76, 175, 80, 0.12)',
                padding: '2px 8px',
                borderRadius: '4px',
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
            padding: '14px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            fontSize: '0.92rem',
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            textTransform: 'uppercase',
            transition: 'all 0.2s',
            borderRadius: '10px',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#e4b84a'
            e.target.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#c9952a'
            e.target.style.transform = 'translateY(0px)'
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* CSS */}
      <style>{`
        .product-image{
          width:100%;
          max-width:220px;
          object-fit:contain;
          position:relative;
          z-index:1;
          filter:drop-shadow(0 16px 28px rgba(0,0,0,0.22));
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
      `}</style>
    </motion.div>
  )
}