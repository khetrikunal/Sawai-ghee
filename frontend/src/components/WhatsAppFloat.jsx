import React from 'react'
import { motion } from 'framer-motion'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/919130643003?text=Hi%2C%20I%27m%20interested%20in%20Sawai%20Gir%20Amrut%20Ghee!"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 500,
        background: '#25D366', color: '#fff',
        width: 56, height: 56, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
      }}
      title="Chat on WhatsApp"
    >
      💬
    </motion.a>
  )
}
