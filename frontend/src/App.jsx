import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import WholesalePage from './pages/WholesalePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MyOrdersPage from './pages/MyOrdersPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminCoupons from './pages/admin/AdminCoupons'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0f3a2a',
            color: '#f5ead0',
            border: '1px solid #c9952a',
            fontFamily: "'DM Sans', sans-serif",
          },
        }}
      />
      <Routes>
        {/* Public routes with Navbar + Footer */}
        <Route path="/" element={<><Navbar /><HomePage /><Footer /><WhatsAppFloat /></>} />
        <Route path="/products" element={<><Navbar /><ProductsPage /><Footer /><WhatsAppFloat /></>} />
        <Route path="/products/:id" element={<><Navbar /><ProductDetailPage /><Footer /><WhatsAppFloat /></>} />
        <Route path="/about" element={<><Navbar /><AboutPage /><Footer /><WhatsAppFloat /></>} />
        <Route path="/wholesale" element={<><Navbar /><WholesalePage /><Footer /><WhatsAppFloat /></>} />
        <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /><WhatsAppFloat /></>} />
        <Route path="/cart" element={<><Navbar /><CartPage /><Footer /><WhatsAppFloat /></>} />
        <Route path="/checkout" element={<><Navbar /><CheckoutPage /><Footer /></>} />
        <Route path="/order-success" element={<><Navbar /><OrderSuccessPage /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Authenticated user routes */}
        <Route path="/my-orders" element={<ProtectedRoute><Navbar /><MyOrdersPage /><Footer /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Navbar /><ProfilePage /><Footer /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute adminOnly><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/coupons" element={<ProtectedRoute adminOnly><AdminCoupons /></ProtectedRoute>} />

        {/* 404 catch-all */}
        <Route path="*" element={<><Navbar /><NotFoundPage /><Footer /></>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
