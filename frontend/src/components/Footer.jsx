import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#071f12', paddingTop: '4.5rem', borderTop: '2.5px solid #c9952a' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 1.75rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(201,149,42,0.25)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '1.85rem', fontWeight: 700, marginBottom: '0.4rem', letterSpacing: '0.5px' }}>
              Sawai Gir Amrut Ghee
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <span
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '1.8px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  lineHeight: 1.3,
                }}
              >
                <strong style={{ color: '#e4b84a', fontSize: '1.05rem' }}>1824</strong>
                <span style={{ color: '#ede0b8', fontWeight: 500 }}> Vituraya Ventures Private Limited</span>
              </span>
            </div>

            <p style={{ color: '#f5ead0', fontSize: '0.98rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              Pure A2 Gir Cow Ghee made with the traditional Vedic Bilona method. Handcrafted at Sawai Gir Farm, Phaltan, Satara, Maharashtra.
            </p>
            <p style={{ color: '#e4b84a', fontSize: '1.05rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
              Traditional purity in every bite, genuine care for your health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: '#e4b84a',
                fontSize: '0.95rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.4rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
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
                <li key={to} style={{ marginBottom: '0.8rem' }}>
                  <Link
                    to={to}
                    style={{
                      color: '#f5ead0',
                      opacity: 0.85,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease-out',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.color = '#e4b84a'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.85'
                      e.currentTarget.style.color = '#f5ead0'
                      e.currentTarget.style.transform = 'translateX(0)'
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
                fontSize: '0.95rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.4rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
              }}
            >
              Products
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['200 ml Glass Jar', '500 ml Glass Jar', '1 Litre Glass Jar', '5 Litre Tin Pack', 'Wholesale Orders'].map((p) => (
                <li key={p} style={{ color: '#f5ead0', opacity: 0.85, fontSize: '1rem', marginBottom: '0.8rem' }}>
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
                fontSize: '0.95rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.4rem',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
              }}
            >
              Contact Us
            </h4>
            <div style={{ color: '#f5ead0', opacity: 0.85, fontSize: '1rem', lineHeight: 1.9 }}>
              <div>
                📞 <a href="tel:9156996309" style={{ color: '#f5ead0', fontWeight: 700, textDecoration: 'none' }}>
                  9156996309
                </a>
              </div>
              <div>📍 Malwadi, Post Bibi</div>
              <div>Tal: Phaltan, Dist: Satara</div>
              <div>Maharashtra – 415537</div>
              <div style={{ marginTop: '1rem' }}>
                <a
                  href="https://wa.me/9156996309"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: '#25D366',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '1.02rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(37, 211, 102, 0.12)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                  }}
                >
                  💬 WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 0', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ color: '#ede0b8', opacity: 0.65, fontSize: '0.88rem' }}>© 2025 Vithoba Ventures Group of Companies. All rights reserved.</div>
          <div style={{ color: '#e4b84a', fontSize: '1rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>
            A legacy of purity | The royal taste of real ghee..!✦
          </div>
        </div>
      </div>
    </footer>
  )
}


