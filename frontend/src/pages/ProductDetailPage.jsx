import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { useCartStore, useAuthStore } from '../store'
import { productAPI, reviewAPI } from '../utils/api'
import productImage from '../assets/bottel (3).jpeg'

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
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [activeImage, setActiveImage] = useState('')
  const [qty, setQty] = useState(1)
  const [reviews, setReviews] = useState([])
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)
  const { user, token } = useAuthStore()

  const addItem = useCartStore((s) => s.addItem)

  const loadReviews = () => {
    reviewAPI.getByProduct(id)
      .then(res => setReviews(res.data || []))
      .catch(() => {})
  }

  useEffect(() => {
    setLoading(true)
    productAPI
      .getById(id)
      .then((r) => {
        setProduct(r.data)
        if (r.data.variants && r.data.variants.length > 0) {
          setSelectedVariant(r.data.variants[0])
        }
        if (r.data.images && r.data.images.length > 0) {
          setActiveImage(r.data.images[0])
        }
      })
      .catch(() => {
        const fallbackProd = FALLBACK_PRODUCTS[id] || FALLBACK_PRODUCTS[1]
        setProduct(fallbackProd)
        setSelectedVariant(fallbackProd)
      })
      .finally(() => setLoading(false))

    loadReviews()
  }, [id])

  if (loading) {
    return (
      <div style={{ background: '#fdf6e3', padding: '5rem 1.5rem', minHeight: '80vh' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '4rem', alignItems: 'start' }}>
          {/* IMAGE SKELETON */}
          <div style={{ height: 420, background: 'rgba(0,0,0,0.03)', borderRadius: '20px', animation: 'pulse 1.5s infinite ease-in-out' }} />
          {/* CONTENT SKELETON */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ height: 40, width: '80%', background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ height: 20, width: '40%', background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ height: 35, width: '30%', background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ height: 100, width: '100%', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ height: 50, width: '60%', background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <div style={{ display: 'flex', gap: '1rem', height: 45 }}>
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.03)', borderRadius: '4px', animation: 'pulse 1.5s infinite ease-in-out' }} />
            </div>
          </div>
        </div>
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}</style>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ padding: '5rem', textAlign: 'center', color: '#7a6040', background: '#fdf6e3' }}>
        Product not found
      </div>
    )
  }

  const handleAddCart = () => {
    if (selectedVariant) {
      addItem({
        ...product,
        id: selectedVariant.id,
        productVariantId: selectedVariant.id,
        size: selectedVariant.size,
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice,
        discount: selectedVariant.discount,
        stock: selectedVariant.stock,
      }, qty)
      toast.success(`${product.name} (${selectedVariant.size}) added to cart!`)
    } else {
      addItem(product, qty)
      toast.success(`${product.size} added to cart!`)
    }
  }

  const handleBuyNow = () => {
    if (selectedVariant) {
      addItem({
        ...product,
        id: selectedVariant.id,
        productVariantId: selectedVariant.id,
        size: selectedVariant.size,
        price: selectedVariant.price,
        originalPrice: selectedVariant.originalPrice,
        discount: selectedVariant.discount,
        stock: selectedVariant.stock,
      }, qty)
    } else {
      addItem(product, qty)
    }
    navigate('/checkout')
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!token) return toast.error('Please login to write a review')
    if (newComment.trim() === '') return toast.error('Please write some comments')
    setSubmittingReview(true)
    try {
      await reviewAPI.create({
        productId: product.id,
        rating: newRating,
        comment: newComment
      })
      toast.success('Review submitted successfully!')
      setNewComment('')
      setNewRating(5)
      loadReviews()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review. You can only review a product once.')
    } finally {
      setSubmittingReview(false)
    }
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price
  const currentSize = selectedVariant ? selectedVariant.size : product.size
  const currentStock = selectedVariant ? selectedVariant.stock : (product.stock || 0)
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice
  const currentDiscount = selectedVariant ? selectedVariant.discount : product.discount

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": activeImage || product.imageUrl || productImage,
    "description": product.description || "Premium A2 Gir Cow Ghee made with the traditional Vedic Bilona method.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": currentPrice,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": currentStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Sawai Gir Farm"
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>{`${product.name} (${currentSize}) | Sawai Ghee`}</title>
        <meta name="description" content={product.description?.substring(0, 150) || `Buy authentic Sawai Gir Amrut Ghee (${currentSize}) online. Handcrafted using traditional Vedic Bilona method.`} />
        <link rel="canonical" href={`https://sawaighee.com/products/${product.id}`} />
        <meta property="og:title" content={`${product.name} (${currentSize}) | Sawai Ghee`} />
        <meta property="og:description" content={product.description?.substring(0, 150) || "Handcrafted A2 Vedic Bilona Ghee."} />
        <meta property="og:image" content={activeImage || product.imageUrl || productImage} />
        <meta property="og:url" content={`https://sawaighee.com/products/${product.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      {/* BREADCRUMB */}
      <div
        style={{
          background: '#0f3a2a',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid rgba(201,149,42,0.3)',
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

          <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>

          <span
            onClick={() => navigate('/products')}
            style={{
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
          >
            Products
          </span>

          <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>

          <span style={{ color: 'rgba(255,255,255,0.8)' }}>
            {product.name}
          </span>

          {currentSize && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
              <span style={{ color: '#e4b84a' }}>
                {currentSize}
              </span>
            </>
          )}
        </div>
      </div>

      {/* PRODUCT SECTION */}
      <section
        style={{
          background: '#fdf6e3',
          padding: '5rem 2rem',
        }}
      >
        <div
          className="product-detail-grid"
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Image and Gallery */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              style={{
                background: '#0f3a2a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3.5rem',
                position: 'relative',
                minHeight: 520,
                overflow: 'hidden',
                borderRadius: '24px',
                border: '2px solid rgba(201,149,42,0.35)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
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
                src={activeImage || product.imageUrl || product.image || productImage}
                alt={product.name}
                className="product-main-image"
              />
            </motion.div>

            {/* THUMBNAILS GALLERY */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                {product.images.map((imgUrl, index) => {
                  const isActive = activeImage === imgUrl || (!activeImage && index === 0);
                  return (
                    <img
                      key={imgUrl}
                      src={imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => {
                        setActiveImage(imgUrl);
                      }}
                      style={{
                        width: 85,
                        height: 85,
                        objectFit: 'contain',
                        background: '#0f3a2a',
                        border: isActive ? '2.5px solid #c9952a' : '1px solid rgba(201, 149, 42, 0.25)',
                        padding: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        borderRadius: '10px',
                      }}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Right Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontSize: '3.2rem',
                color: '#0f3a2a',
                lineHeight: 1.08,
                marginBottom: '0.5rem',
                fontWeight: 700,
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                color: '#7a6040',
                fontSize: '0.95rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.75rem',
                fontWeight: 600,
              }}
            >
              {currentSize} · A2 Gir Cow Ghee · Vedic Bilona Method
            </p>

            {/* PRICE */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1.25rem',
                marginBottom: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '2.8rem',
                  fontWeight: 800,
                  color: '#c9952a',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                ₹{currentPrice?.toLocaleString('en-IN')}
              </span>

              {currentOriginalPrice && (
                <span
                  style={{
                    fontSize: '1rem',
                    color: '#aba090',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{currentOriginalPrice?.toLocaleString('en-IN')}
                </span>
              )}

              {currentDiscount && (
                <span
                  style={{
                    fontSize: '0.82rem',
                    background: '#e8f5e9',
                    color: '#2e7d32',
                    padding: '3px 8px',
                    fontWeight: 600,
                  }}
                >
                  {currentDiscount}% OFF
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
              Inclusive of all taxes · Free shipping above ₹999
            </p>

            {/* VARIANT SELECTOR */}
            {product.variants && product.variants.length > 1 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: '#0f3a2a', marginBottom: '0.75rem' }}>
                  Select Size
                </h4>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant && selectedVariant.id === v.id
                    return (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariant(v);
                        }}
                        style={{
                          background: isSelected ? '#0f3a2a' : 'rgba(255,255,255,0.7)',
                          color: isSelected ? '#e4b84a' : '#0f3a2a',
                          border: isSelected ? '1px solid #c9952a' : '1px solid #ede0b8',
                          padding: '8px 16px',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.82rem',
                          fontWeight: isSelected ? 'bold' : 'normal',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          borderRadius: '4px',
                        }}
                      >
                        {v.size} - ₹{v.price}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* DESCRIPTION */}
            <p
              style={{
                color: '#4a3820',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginBottom: '1.75rem',
              }}
            >
              {product.description || `Premium A2 Gir Cow Ghee made with the traditional Vedic Bilona method. Each batch is handcrafted from the milk of desi Gir cows raised on our farm in Phaltan, Maharashtra.`}
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
                  ₹{(currentPrice * qty).toLocaleString('en-IN')}
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
              <button onClick={handleAddCart} className="btn-add-cart">
                Add to Cart
              </button>

              <button onClick={handleBuyNow} className="btn-buy-now">
                Buy Now
              </button>
            </div>

            {/* FARM INFO */}
            <div
              style={{
                background: '#fff',
                padding: '1.25rem',
                border: '1px solid rgba(201, 149, 42, 0.25)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                color: '#4a3820',
                lineHeight: 1.65,
                boxShadow: '0 4px 12px rgba(74, 56, 32, 0.02)',
              }}
            >
              <strong style={{ color: '#0f3a2a' }}>
                Manufactured by: Sawai Gir Farm
              </strong>
              <br />
              At: Malwadi, Post: Bibi, Tal: Phaltan, Dist: Satara – 415537, Maharashtra
              <br />
              Customer Care:{' '}
              <a href="tel:9130643003" style={{ color: '#c9952a', fontWeight: 600 }}>
                9130643003
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section style={{ background: '#f5ead0', padding: '4rem 1.5rem', borderTop: '1px solid rgba(201, 149, 42, 0.15)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.5rem', color: '#0f3a2a', marginBottom: '2rem', fontWeight: 700 }}>
            Customer Reviews
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }} className="reviews-grid">
            
            {/* Left Column: Review List */}
            <div>
              {reviews.length === 0 ? (
                <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '8px', border: '1px solid rgba(201, 149, 42, 0.15)', textAlign: 'center' }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', margin: 0 }}>No reviews yet for this product. Be the first to share your experience!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {reviews.map((rev) => (
                    <div key={rev.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(201, 149, 42, 0.15)', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                        <strong style={{ color: '#0f3a2a', fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif" }}>{rev.userName || 'Verified Buyer'}</strong>
                        <span style={{ color: '#888', fontSize: '0.75rem' }}>{rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '2px', color: '#c9952a', marginBottom: '0.75rem' }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} style={{ fontSize: '1.1rem' }}>{i < rev.rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                      <p style={{ color: '#1a1208', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Write a Review Form */}
            <div>
              <div style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid rgba(201, 149, 42, 0.15)' }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', fontSize: '1.6rem', marginBottom: '1.25rem', fontWeight: 600 }}>
                  Share Your Thoughts
                </h3>

                {token ? (
                  <form onSubmit={handleReviewSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                      <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820', marginBottom: 6, fontWeight: 600 }}>Rating</label>
                      <div style={{ display: 'flex', gap: '6px', color: '#c9952a', fontSize: '1.75rem' }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            onClick={() => setNewRating(i + 1)}
                            style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                          >
                            {i < newRating ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#4a3820', marginBottom: 6, fontWeight: 600 }}>Review Comments</label>
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your review here..."
                        rows={5}
                        required
                        style={{
                          width: '100%',
                          border: '1px solid #ede0b8',
                          padding: '12px 14px',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.88rem',
                          borderRadius: '4px',
                          background: '#fdf6e3',
                          color: '#1a1208',
                          resize: 'vertical',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingReview}
                      style={{
                        width: '100%',
                        padding: '13px',
                        background: '#0f3a2a',
                        color: '#e4b84a',
                        border: 'none',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: 'uppercase',
                        borderRadius: '4px',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#1a5c3e'}
                      onMouseLeave={(e) => e.target.style.background = '#0f3a2a'}
                    >
                      {submittingReview ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                      You need to be signed in to submit a review for this product.
                    </p>
                    <button
                      onClick={() => navigate('/login')}
                      style={{
                        background: '#0f3a2a',
                        color: '#e4b84a',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '4px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.82rem',
                      }}
                    >
                      Login Now
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
        <style>{`
          @media(max-width:768px){
            .reviews-grid {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
          }
        `}</style>
      </section>

      {/* CSS */}
      <style>{`
        .product-main-image{
          width:100%;
          max-width:380px;
          object-fit:contain;
          position:relative;
          z-index:2;
          filter:drop-shadow(0 25px 45px rgba(0,0,0,0.45));
          animation:float 4s ease-in-out infinite;
        }

        .btn-add-cart {
          flex: 1;
          padding: 16px 24px;
          background: #0f3a2a;
          color: #f5ead0;
          border: 1.5px solid rgba(201, 149, 42, 0.4);
          font-weight: 700;
          letter-spacing: 1.5px;
          font-size: 0.95rem;
          cursor: pointer;
          text-transform: uppercase;
          min-width: 160px;
          border-radius: 8px;
          transition: all 0.2s ease-out;
        }
        .btn-add-cart:hover {
          background: #1a5c3e;
          color: #fff;
          transform: translateY(-1px);
        }

        .btn-buy-now {
          flex: 1;
          padding: 16px 24px;
          background: #c9952a;
          color: #0f3a2a;
          border: none;
          font-weight: 800;
          letter-spacing: 1.5px;
          font-size: 0.95rem;
          cursor: pointer;
          text-transform: uppercase;
          min-width: 160px;
          border-radius: 8px;
          transition: all 0.2s ease-out;
        }
        .btn-buy-now:hover {
          background: #e4b84a;
          transform: translateY(-1px);
        }

        @keyframes float{
          0%{
            transform:translateY(0px);
          }
          50%{
            transform:translateY(-14px);
          }
          100%{
            transform:translateY(0px);
          }
        }

        @media(max-width:960px){
          .product-detail-grid{
            grid-template-columns:1fr !important;
            gap:3rem !important;
          }

          .product-main-image{
            max-width:280px;
          }
        }
      `}</style>
    </div>
  )
}