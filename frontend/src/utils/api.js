import axios from 'axios'
import { useAuthStore } from '../store'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  try {
    const token = useAuthStore.getState().token
    if (token) config.headers.Authorization = `Bearer ${token}`
  } catch (e) {
    console.warn('[api] request interceptor error (non-fatal):', e)
  }
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    try {
      if (err.response?.status === 401) {
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }
    } catch (e) {
      console.warn('[api] response interceptor error (non-fatal):', e)
    }
    return Promise.reject(err)
  }
)


// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
}

// ─── Products ─────────────────────────────────────────────────────────────────
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  updateStock: (id, qty) => api.patch(`/products/${id}/stock`, { quantity: qty }),
  uploadImage: (formData) => api.post('/products/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  search: (query) => api.get(`/products/search?q=${query}`),
}

// ─── Coupons ──────────────────────────────────────────────────────────────────
export const couponAPI = {
  validate: (code) => api.get(`/coupons/validate?code=${code}`),
  getAll: () => api.get('/coupons'),
  create: (data) => api.post('/coupons', data),
  update: (id, data) => api.put(`/coupons/${id}`, data),
  delete: (id) => api.delete(`/coupons/${id}`),
}

// ─── Orders ───────────────────────────────────────────────────────────────────
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: (params) => api.get('/orders/my', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: (params) => api.get('/orders/all', { params }),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  requestReturn: (id, data) => api.post(`/orders/${id}/return`, data),
  getInvoiceUrl: (id) => `${import.meta.env.VITE_API_BASE_URL || '/api'}/orders/${id}/invoice`,
  track: (id) => api.get(`/orders/${id}/track`),
}

// ─── Payments ─────────────────────────────────────────────────────────────────
export const paymentAPI = {
  createOrder: (data) => api.post('/payments/create-order', data),
  verifyPayment: (data) => api.post('/payments/verify', data),
}

// ─── Wholesale ────────────────────────────────────────────────────────────────
export const wholesaleAPI = {
  submitLead: (data) => api.post('/wholesale/leads', data),
  getAllLeads: () => api.get('/wholesale/leads'),
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
export const reviewAPI = {
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`),
  create: (data) => api.post('/reviews', data),
}

export default api
