import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useCartStore } from '../store'
import { productAPI } from '../utils/api'
import productImage from '../assets/bottel.jpeg'

const FALLBACK_PRODUCTS = {
  1: {
    id: 1,
    name: 'Sawai Gir Amrut Ghee',
    size: '200 ml',
    price: 640,
    image: productImage,
  },

  2: {
    id: 2,
    name: 'Sawai Gir Amrut Ghee',
    size: '500 ml',
    price: 1600,
    image: productImage,
  },

  3: {
    id: 3,
    name: 'Sawai Gir Amrut Ghee',
    size: '1 Litre',
    price: 3200,
    image: productImage,
  },
}

const BENEFITS = [
  'Rich in fat-soluble vitamins A, D, E, and K — boosts immunity and bone health',
  'Contains CLA (Conjugated Linoleic Acid) — a natural fat-burning compound',
  'Promotes healthy digestion; easy to absorb and gentle on the stomach',
  'High smoke point — ideal for Indian tadka, sautéing, and deep frying',
  'Butyric acid content supports gut health and reduces inflammation',
  'Natural CLA and Omega-3 fatty acids support heart and brain health',
]

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)

  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    productAPI
      .getById(id)
      .then((r) => setProduct(r.data))
      .catch(() =>
        setProduct(
          FALLBACK_PRODUCTS[id] || FALLBACK_PRODUCTS[1]
        )
      )
  }, [id])

  if (!product)
    return (
      <div
        style={{
          padding: '5rem',
          textAlign: 'center',
          color: '#7a6040',
        }}
      >
        Loading...
      </div>
    )

  const handleAddCart = () => {
    addItem(product, qty)
    toast.success(`${product.size} added to cart!`)
  }

  const handleBuyNow = () => {
    addItem(product, qty)
    navigate('/checkout')
  }

  return (
    <div>
      {/* BREADCRUMB */}
      <div
        style={{
          background: '#0f3a2a',
          padding: '1rem 1.5rem',
          borderBottom:
            '1px solid rgba(201,149,42,0.3)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            fontSize: '0.8rem',
          }}
        >
          <span
            onClick={() => navigate('/')}
            style={{
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
          >
            Home
          </span>

          <span style={{ color: 'rgba(255,255,255,0.25)' }}>
            /
          </span>

          <span
            onClick={() => navigate('/products')}
            style={{
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
          >
            Products
          </span>

          <span style={{ color: 'rgba(255,255,255,0.25)' }}>
            /
          </span>

          <span style={{ color: '#e4b84a' }}>
            {product.size}
          </span>
        </div>
      </div>

      {/* PRODUCT SECTION */}
      <section
        style={{
          background: '#fdf6e3',
          padding: '4rem 1.5rem',
        }}
      >
        <div
          className="product-detail-grid"
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              background: '#0f3a2a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              position: 'relative',
              minHeight: 420,
              overflow: 'hidden',
              borderRadius: '20px',
            }}
          >
            <div
              className="pattern-overlay"
              style={{
                position: 'absolute',
                inset: 0,
              }}
            />

            {/* BADGE */}
            {product.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: '#c9952a',
                  color: '#0f3a2a',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '5px 12px',
                  letterSpacing: '1px',
                  zIndex: 2,
                }}
              >
                {product.badge}
              </div>
            )}

            {/* GLOW */}
            <div
              style={{
                position: 'absolute',
                width: 350,
                height: 350,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(201,149,42,0.22) 0%, transparent 70%)',
              }}
            />

            {/* PRODUCT IMAGE */}
            <img
              src={product.image}
              alt={product.name}
              className="product-main-image"
            />
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontSize: '2.5rem',
                color: '#0f3a2a',
                lineHeight: 1.1,
                marginBottom: '0.4rem',
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                color: '#7a6040',
                fontSize: '0.82rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              {product.size} · A2 Gir Cow Ghee · Vedic
              Bilona Method
            </p>

            {/* PRICE */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                marginBottom: '0.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 700,
                  color: '#c9952a',
                }}
              >
                ₹
                {product.price?.toLocaleString('en-IN')}
              </span>

              {product.originalPrice && (
                <span
                  style={{
                    fontSize: '1rem',
                    color: '#aba090',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹
                  {product.originalPrice?.toLocaleString(
                    'en-IN'
                  )}
                </span>
              )}

              {product.discount && (
                <span
                  style={{
                    fontSize: '0.82rem',
                    background: '#e8f5e9',
                    color: '#2e7d32',
                    padding: '3px 8px',
                    fontWeight: 600,
                  }}
                >
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <p
              style={{
                fontSize: '0.78rem',
                color: '#7a6040',
                marginBottom: '1.75rem',
              }}
            >
              Inclusive of all taxes · Free shipping
              above ₹999
            </p>

            {/* DESCRIPTION */}
            <p
              style={{
                color: '#4a3820',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginBottom: '1.75rem',
              }}
            >
              Premium A2 Gir Cow Ghee made with the
              traditional Vedic Bilona method. Each
              batch is handcrafted from the milk of
              desi Gir cows raised on our farm in
              Phaltan, Maharashtra.
            </p>

            {/* BENEFITS */}
            <div style={{ marginBottom: '2rem' }}>
              <h4
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontSize: '1.2rem',
                  color: '#0f3a2a',
                  marginBottom: '1rem',
                }}
              >
                Health Benefits
              </h4>

              {BENEFITS.map((b) => (
                <div
                  key={b}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    marginBottom: '0.6rem',
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      background: '#c9952a',
                      borderRadius: '50%',
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />

                  <span
                    style={{
                      fontSize: '0.84rem',
                      color: '#4a3820',
                      lineHeight: 1.55,
                    }}
                  >
                    {b}
                  </span>
                </div>
              ))}
            </div>

            {/* QTY */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  color: '#7a6040',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Quantity
              </span>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ede0b8',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() =>
                    setQty(Math.max(1, qty - 1))
                  }
                  style={{
                    width: 40,
                    height: 40,
                    background: '#f5ead0',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    color: '#0f3a2a',
                  }}
                >
                  −
                </button>

                <span
                  style={{
                    width: 50,
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  {qty}
                </span>

                <button
                  onClick={() => setQty(qty + 1)}
                  style={{
                    width: 40,
                    height: 40,
                    background: '#f5ead0',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    color: '#0f3a2a',
                  }}
                >
                  +
                </button>
              </div>

              <span
                style={{
                  fontSize: '0.85rem',
                  color: '#7a6040',
                }}
              >
                Total:{' '}
                <strong style={{ color: '#0f3a2a' }}>
                  ₹
                  {(
                    product.price * qty
                  ).toLocaleString('en-IN')}
                </strong>
              </span>
            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={handleAddCart}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#0f3a2a',
                  color: '#e4b84a',
                  border: 'none',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  minWidth: 140,
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                style={{
                  flex: 1,
                  padding: '14px',
                  background: '#c9952a',
                  color: '#0f3a2a',
                  border: 'none',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  minWidth: 140,
                }}
              >
                Buy Now
              </button>
            </div>

            {/* FARM INFO */}
            <div
              style={{
                background: '#f5ead0',
                padding: '1rem 1.25rem',
                borderLeft: '3px solid #c9952a',
                fontSize: '0.8rem',
                color: '#4a3820',
                lineHeight: 1.65,
              }}
            >
              <strong style={{ color: '#0f3a2a' }}>
                Manufactured by: Sawai Gir Farm
              </strong>
              <br />
              At: Malwadi, Post: Bibi, Tal:
              Phaltan, Dist: Satara – 415537,
              Maharashtra
              <br />
              Customer Care:{' '}
              <a
                href="tel:9130643003"
                style={{ color: '#c9952a' }}
              >
                9130643003
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CSS */}
      <style>{`
        .product-main-image{
          width:100%;
          max-width:280px;
          object-fit:contain;
          position:relative;
          z-index:2;
          filter:drop-shadow(0 18px 30px rgba(0,0,0,0.35));
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
          .product-detail-grid{
            grid-template-columns:1fr !important;
            gap:2rem !important;
          }

          .product-main-image{
            max-width:220px;
          }
        }
      `}</style>
    </div>
  )
}