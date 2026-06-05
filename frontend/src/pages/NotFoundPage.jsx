import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={{
      background: '#f5ead0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ textAlign: 'center', maxWidth: 500 }}>
        <div style={{ fontSize: '8rem', fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', lineHeight: 1, marginBottom: '0.5rem' }}>404</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0f3a2a', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 600 }}>
          Page Not Found
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#4a3820', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ background: '#0f3a2a', color: '#e4b84a', padding: '12px 28px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', letterSpacing: '0.5px', transition: 'background 0.2s' }}>
            Go Home
          </Link>
          <Link to="/products" style={{ background: 'transparent', border: '1px solid #0f3a2a', color: '#0f3a2a', padding: '12px 28px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', transition: 'all 0.2s' }}>
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
