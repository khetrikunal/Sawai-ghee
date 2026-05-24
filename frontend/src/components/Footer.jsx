import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#071f12', paddingTop: '3rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid rgba(201,149,42,0.2)' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e4b84a', fontSize: '1.4rem', marginBottom: '0.25rem' }}> Sawai Gir Amrut Ghee</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>A Brand by Vithoba Ventures</div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', lineHeight: 1.7 }}>Pure A2 Gir Cow Ghee made with the traditional Vedic Bilona method. Crafted at Sawai Gir Farm, Phaltan, Maharashtra.</p>
            <p style={{ color: '#c9952a', fontSize: '0.82rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", marginTop: '0.75rem' }}>Traditional purity in every bite, genuine care for your health.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#e4b84a', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About Us'], ['/wholesale', 'Wholesale'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to} style={{ marginBottom: '0.5rem' }}>
                  <Link to={to} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.83rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#e4b84a'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ color: '#e4b84a', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Products</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['500 ml Pack', '1 Litre Pack', '5 Litre Pack', 'Wholesale Orders', 'Gift Hampers'].map(p => (
                <li key={p} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.83rem', marginBottom: '0.5rem' }}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#e4b84a', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>Contact</h4>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.83rem', lineHeight: 1.8 }}>
              <div>📞 <a href="tel:9130643003" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>+9130643003</a></div>
              <div>📍 Malwadi, Post Bibi</div>
              <div>Tal: Phaltan, Dist: Satara</div>
              <div>Maharashtra – 415537</div>
              <div style={{ marginTop: '0.75rem' }}>
                <a href="https://wa.me/919130643003" target="_blank" rel="noreferrer" style={{ color: '#25D366', textDecoration: 'none' }}>💬 WhatsApp Us</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>© 2025 Vithoba Ventures Group of Companies. All rights reserved.</div>
          <div style={{ color: '#c9952a', fontSize: '0.78rem', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif" }}>A legacy of purity | The royal taste of real ghee..!✦</div>
        </div>
      </div>
    </footer>
  )
}
