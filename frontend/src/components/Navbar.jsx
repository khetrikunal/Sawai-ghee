import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, useAuthStore } from '../store'
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from 'react-icons/fi'

/* IMPORT YOUR LOGO */
import logo from '../assets/logo.jpeg'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { items } = useCartStore()
  const { user, logout } = useAuthStore()

  const navigate = useNavigate()

  const cartCount = items.reduce((s, i) => s + i.qty, 0)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)

    window.addEventListener('scroll', handler)

    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/wholesale', label: 'Wholesale' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav
        className="glass-panel-dark"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '2px solid rgba(201, 149, 42, 0.4)',
          transition: 'all 0.3s ease',
          boxShadow: scrolled
            ? '0 6px 28px rgba(0,0,0,0.4)'
            : 'none',
        }}
      >
        <div className="navbar-container">
          {/* LEFT LOGO */}
          <Link to="/" className="logo-wrapper">
            <img
              src={logo}
              alt="Sawai Gir Amrut"
              className="navbar-logo"
            />

            <div>
              <div className="brand-title">
                Sawai Gir Amrut
              </div>

              <div className="brand-subtitle">
                Pure A2 Ghee · Bilona Method
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <ul className="desktop-nav">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="nav-link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="right-actions">
            {/* LOGIN / USER */}
            {user ? (
              <div className="user-section">
                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="admin-link">
                    Admin
                  </Link>
                )}

                <Link to="/my-orders" className="nav-link" style={{ fontSize: '0.92rem' }}>
                  Orders
                </Link>

                <Link to="/profile" className="nav-link" style={{ fontSize: '0.92rem' }}>
                  {user.name?.split(' ')[0]}
                </Link>

                <button
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-link">
                <FiUser size={19} />
                Login
              </Link>
            )}

            {/* CART */}
            <Link to="/cart" className="cart-btn">
              <FiShoppingCart size={19} />

              <span>Cart</span>

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle Navigation"
            >
              {menuOpen ? (
                <FiX size={28} />
              ) : (
                <FiMenu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                background: '#0a2819',
                overflow: 'hidden',
                borderTop:
                  '1px solid rgba(201,149,42,0.2)',
              }}
            >
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-nav-link"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* CSS */}
      <style>{`

        /* NAVBAR */
        .navbar-container{
          max-width:1320px;
          margin:0 auto;
          padding:0 1.75rem;
          height:90px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        /* LOGO */
        .logo-wrapper{
          display:flex;
          align-items:center;
          gap:16px;
          text-decoration:none;
          min-width:max-content;
        }

        .navbar-logo{
          width:68px;
          height:68px;
          object-fit:cover;
          border-radius:50%;
          background:#fff;
          padding:3px;
          border:2.5px solid #c9952a;
          box-shadow:0 0 18px rgba(201,149,42,0.35);
          flex-shrink:0;
          transition: transform 0.2s ease;
        }

        .logo-wrapper:hover .navbar-logo {
          transform: scale(1.04);
        }

        .brand-title{
          color:#e4b84a;
          font-family:'Cormorant Garamond', serif;
          font-size:1.65rem;
          font-weight:700;
          line-height:1.1;
          letter-spacing: 0.5px;
        }

        .brand-subtitle{
          color:#ede0b8;
          font-size:0.75rem;
          letter-spacing:2px;
          text-transform:uppercase;
          margin-top:4px;
          font-family:'DM Sans', sans-serif;
          font-weight: 500;
        }

        /* NAV LINKS */
        .desktop-nav{
          display:flex;
          align-items:center;
          gap:2.2rem;
          list-style:none;
          margin:0;
          padding:0;
        }

        .nav-link{
          color:#f5ead0;
          text-decoration:none;
          font-size:0.98rem;
          letter-spacing:1.5px;
          text-transform:uppercase;
          transition:0.3s ease;
          font-weight:600;
          position: relative;
          padding: 6px 0;
        }

        .nav-link:hover{
          color:#e4b84a;
        }

        /* RIGHT SIDE */
        .right-actions{
          display:flex;
          align-items:center;
          gap:1.2rem;
        }

        .login-link{
          color:#e4b84a;
          text-decoration:none;
          display:flex;
          align-items:center;
          gap:6px;
          font-size:0.95rem;
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .login-link:hover {
          background: rgba(228, 184, 74, 0.1);
        }

        .cart-btn{
          text-decoration:none;
          background:#c9952a;
          color:#0f3a2a;
          padding:12px 20px;
          border-radius:8px;
          display:flex;
          align-items:center;
          gap:8px;
          font-weight:700;
          font-size:0.95rem;
          letter-spacing: 0.5px;
          position:relative;
          transition: background 0.2s, transform 0.15s;
        }

        .cart-btn:hover {
          background: #e4b84a;
          transform: translateY(-1px);
        }

        .cart-count{
          width:22px;
          height:22px;
          border-radius:50%;
          background:#0f3a2a;
          color:#e4b84a;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:12px;
          font-weight:700;
          margin-left: 2px;
        }

        .user-section{
          display:flex;
          align-items:center;
          gap:1rem;
        }

        .user-name{
          color:#f5ead0;
          font-size:0.95rem;
        }

        .logout-btn{
          background:transparent;
          border:1px solid rgba(201,149,42,0.5);
          color:#c9952a;
          padding:8px 16px;
          border-radius: 6px;
          cursor:pointer;
          font-size:0.88rem;
          font-weight: 600;
          transition: all 0.2s ease-out;
        }
        .logout-btn:hover {
          background: rgba(201,149,42,0.15);
          border-color: #e4b84a;
          color: #e4b84a;
        }

        .admin-link{
          color:#e4b84a;
          text-decoration:none;
          font-size:0.88rem;
          font-weight:700;
          letter-spacing:1px;
          text-transform:uppercase;
          border: 1.5px solid #e4b84a;
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.2s ease-out;
        }
        .admin-link:hover {
          background: #e4b84a;
          color: #0f3a2a;
        }

        /* MOBILE */
        .mobile-menu-btn{
          display:none;
          background:none;
          border:none;
          color:#e4b84a;
          cursor:pointer;
          padding: 4px;
        }

        .mobile-nav-link{
          display:block;
          padding:1.2rem 1.75rem;
          color:#f5ead0;
          text-decoration:none;
          border-bottom:1px solid rgba(255,255,255,0.08);
          font-size:1.05rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .mobile-nav-link:hover {
          background: rgba(228, 184, 74, 0.1);
          color: #e4b84a;
        }

        /* RESPONSIVE */
        @media(max-width:960px){
          .desktop-nav{
            gap:1.2rem;
          }
          .brand-title{
            font-size:1.4rem;
          }
          .navbar-logo{
            width:58px;
            height:58px;
          }
        }

        @media(max-width:820px){
          .navbar-container{
            height:78px;
            padding:0 1.2rem;
          }

          .desktop-nav{
            display:none;
          }

          .mobile-menu-btn{
            display:flex;
            align-items:center;
            justify-content:center;
          }

          .navbar-logo{
            width:52px;
            height:52px;
          }

          .brand-title{
            font-size:1.25rem;
          }

          .brand-subtitle{
            font-size:0.6rem;
            letter-spacing:1.4px;
          }

          .login-link{
            display:none;
          }

          .cart-btn{
            padding:9px 15px;
            font-size:0.85rem;
          }

          .user-name{
            display:none;
          }

          .logout-btn{
            display:none;
          }
        }

      `}</style>
    </>
  )
}