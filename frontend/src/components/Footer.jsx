import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#071f12', paddingTop: '3.5rem', borderTop: '2px solid #c9952a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(201,149,42,0.2)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              Sawai Gir Amrut Ghee
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <span
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '1.4px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  lineHeight: 1.2,
                }}
              >
                <strong style={{ color: '#e4b84a', fontSize: '0.9rem' }}>1824</strong>
                <span style={{ color: '#ede0b8' }}> Vituraya Ventures Private Limited</span>
              </span>
            </div>

            <p style={{ color: '#f5ead0', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              Pure A2 Gir Cow Ghee made with the traditional Vedic Bilona method. Crafted at Sawai Gir Farm, Phaltan, Maharashtra.
            </p>
            <p style={{ color: '#e4b84a', fontSize: '0.85rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
              Traditional purity in every bite, genuine care for your health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: '#e4b84a',
                fontSize: '0.75rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                ['/', 'Home'],
                ['/products', 'Products'],
                ['/about', 'About Us'],
                ['/wholesale', 'Wholesale'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to} style={{ marginBottom: '0.6rem' }}>
                  <Link
                    to={to}
                    style={{
                      color: '#f5ead0',
                      opacity: 0.8,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease-out',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.color = '#e4b84a'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.8'
                      e.currentTarget.style.color = '#f5ead0'
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4
              style={{
                color: '#e4b84a',
                fontSize: '0.75rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Products
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['500 ml Glass Jar', '1 Litre Glass Jar', '5 Litre Tin Pack', 'Wholesale Orders', 'Special Gift Hampers'].map((p) => (
                <li key={p} style={{ color: '#f5ead0', opacity: 0.8, fontSize: '0.85rem', marginBottom: '0.6rem' }}>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: '#e4b84a',
                fontSize: '0.75rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Contact Us
            </h4>
            <div style={{ color: '#f5ead0', opacity: 0.8, fontSize: '0.85rem', lineHeight: 1.8 }}>
              <a href="tel:9156996309" style={{ color: '#f5ead0', fontWeight: 700, textDecoration: 'none' }}>
                9156996309
              </a>
              <div>📍 Malwadi, Post Bibi</div>
              <div>Tal: Phaltan, Dist: Satara</div>
              <div>Maharashtra – 415537</div>
              <div style={{ marginTop: '0.8rem' }}>
                <a
                  href="https://wa.me/919130643003"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#25D366',
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  💬 WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ color: '#ede0b8', opacity: 0.5, fontSize: '0.75rem' }}>© 2025 Vithoba Ventures Group of Companies. All rights reserved.</div>
          <div style={{ color: '#e4b84a', fontSize: '0.82rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
            A legacy of purity | The royal taste of real ghee..!✦
          </div>
        </div>
      </div>
    </footer>
  )
}

