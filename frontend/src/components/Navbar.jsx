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
            ? '0 4px 24px rgba(0,0,0,0.35)'
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

                <Link to="/my-orders" className="nav-link" style={{ fontSize: '0.78rem' }}>
                  Orders
                </Link>

                <Link to="/profile" className="nav-link" style={{ fontSize: '0.78rem' }}>
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
                <FiUser size={16} />
                Login
              </Link>
            )}

            {/* CART */}
            <Link to="/cart" className="cart-btn">
              <FiShoppingCart size={16} />

              Cart

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
            >
              {menuOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} />
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
                  '1px solid rgba(201,149,42,0.15)',
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
          max-width:1200px;
          margin:0 auto;
          padding:0 1.2rem;
          height:72px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        /* LOGO */
        .logo-wrapper{
          display:flex;
          align-items:center;
          gap:12px;
          text-decoration:none;
          min-width:max-content;
        }

        .navbar-logo{
          width:52px;
          height:52px;
          object-fit:cover;
          border-radius:50%;
          background:#fff;
          padding:3px;
          border:2px solid #c9952a;
          box-shadow:0 0 14px rgba(201,149,42,0.3);
          flex-shrink:0;
        }

        .brand-title{
          color:#e4b84a;
          font-family:'Cormorant Garamond', serif;
          font-size:1.3rem;
          font-weight:700;
          line-height:1;
        }

        .brand-subtitle{
          color:#ede0b8;
          font-size:0.58rem;
          letter-spacing:1.8px;
          text-transform:uppercase;
          margin-top:4px;
          font-family:'DM Sans', sans-serif;
        }

        /* NAV LINKS */
        .desktop-nav{
          display:flex;
          align-items:center;
          gap:1.7rem;
          list-style:none;
          margin:0;
          padding:0;
        }

        .nav-link{
          color:#f5ead0;
          text-decoration:none;
          font-size:0.82rem;
          letter-spacing:1.3px;
          text-transform:uppercase;
          transition:0.3s ease;
          font-weight:500;
        }

        .nav-link:hover{
          color:#e4b84a;
        }

        /* RIGHT SIDE */
        .right-actions{
          display:flex;
          align-items:center;
          gap:0.9rem;
        }

        .login-link{
          color:#e4b84a;
          text-decoration:none;
          display:flex;
          align-items:center;
          gap:4px;
          font-size:0.82rem;
        }

        .cart-btn{
          text-decoration:none;
          background:#c9952a;
          color:#0f3a2a;
          padding:10px 15px;
          border-radius:6px;
          display:flex;
          align-items:center;
          gap:6px;
          font-weight:700;
          font-size:0.8rem;
          position:relative;
        }

        .cart-count{
          width:18px;
          height:18px;
          border-radius:50%;
          background:#0f3a2a;
          color:#e4b84a;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:11px;
          font-weight:700;
        }

        .user-section{
          display:flex;
          align-items:center;
          gap:0.7rem;
        }

        .user-name{
          color:#f5ead0;
          font-size:0.82rem;
        }

        .logout-btn{
          background:transparent;
          border:1px solid rgba(201,149,42,0.4);
          color:#c9952a;
          padding:6px 12px;
          cursor:pointer;
          font-size:0.75rem;
          transition: all 0.2s ease-out;
        }
        .logout-btn:hover {
          background: rgba(201,149,42,0.1);
          border-color: #e4b84a;
          color: #e4b84a;
        }

        .admin-link{
          color:#e4b84a;
          text-decoration:none;
          font-size:0.78rem;
          font-weight:700;
          letter-spacing:1px;
          text-transform:uppercase;
          border: 1px solid #e4b84a;
          padding: 6px 12px;
          border-radius: 4px;
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
        }

        .mobile-nav-link{
          display:block;
          padding:1rem 1.5rem;
          color:#f5ead0;
          text-decoration:none;
          border-bottom:1px solid rgba(255,255,255,0.05);
          font-size:0.9rem;
        }

        /* RESPONSIVE */
        @media(max-width:768px){

          .navbar-container{
            height:68px;
            padding:0 1rem;
          }

          .desktop-nav{
            display:none;
          }

          .mobile-menu-btn{
            display:flex;
          }

          .navbar-logo{
            width:44px;
            height:44px;
          }

          .brand-title{
            font-size:1rem;
          }

          .brand-subtitle{
            font-size:0.48rem;
            letter-spacing:1.2px;
          }

          .login-link{
            display:none;
          }

          .cart-btn{
            padding:8px 12px;
            font-size:0.72rem;
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