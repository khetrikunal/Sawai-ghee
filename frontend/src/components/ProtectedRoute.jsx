import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, token } = useAuthStore()

  if (!token || !user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'ADMIN') return <Navigate to="/" replace />

  return children
}
