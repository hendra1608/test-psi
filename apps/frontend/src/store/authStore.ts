
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  picture?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: () => void
  logout: () => Promise<void>
  setUser: (user: User) => void
  checkAuth: () => Promise<void>
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: () => {
        window.location.href = `${API_BASE_URL}/auth/google`
      },

      logout: async () => {
  set({ loading: true })
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      
    })

    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-store')
    }

    
    window.location.href = '/login'
  }
},


      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      checkAuth: async () => {
        set({ loading: true })
        try {
          const res = await fetch(`${API_BASE_URL}/auth/me`, {
            credentials: 'include',
          })
          if (res.ok) {
            const user = await res.json()
            set({ user, isAuthenticated: true })
          } else {
            set({ user: null, isAuthenticated: false })
          }
        } catch (error) {
          console.error('Auth check error:', error)
          set({ user: null, isAuthenticated: false })
        } finally {
          set({ loading: false })
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
