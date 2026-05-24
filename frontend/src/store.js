import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Cart Store ──────────────────────────────────────────────────────────────
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, qty = 1) => {
        const { items } = get()
        const existing = items.find(i => i.id === product.id)
        if (existing) {
          set({ items: items.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i) })
        } else {
          set({ items: [...items, { ...product, qty }] })
        }
      },

      removeItem: (id) => set({ items: get().items.filter(i => i.id !== id) }),

      updateQty: (id, qty) => {
        if (qty < 1) return
        set({ items: get().items.map(i => i.id === id ? { ...i, qty } : i) })
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((sum, i) => sum + i.price * i.qty, 0)
      },

      get count() {
        return get().items.reduce((sum, i) => sum + i.qty, 0)
      },
    }),
    { name: 'sawai-cart' }
  )
)

// ─── Auth Store ───────────────────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
      isAdmin: () => {
        const state = useAuthStore.getState()
        return state.user?.role === 'ADMIN'
      },
    }),
    { name: 'sawai-auth' }
  )
)
