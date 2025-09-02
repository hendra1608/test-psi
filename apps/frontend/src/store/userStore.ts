
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface RandomUser {
  id?: string
  name: string
  location: string
  email: string
  age: number
  phone: string
  cell: string
  picture: string[]
  isLocal?: boolean
}

interface UserDataState {
  randomUsers: RandomUser[]
  loading: boolean
  searchText: string
  filteredUsers: RandomUser[]
  
  fetchRandomUsers: (results?: number, page?: number) => Promise<void>
  addLocalUser: (user: Omit<RandomUser, 'id' | 'isLocal'>) => void
  removeUser: (userId: string) => void
  setSearchText: (text: string) => void
  updateFilteredUsers: () => void
  clearAllData: () => void
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const useUserStore = create<UserDataState>()(
  persist(
    (set, get) => ({
      randomUsers: [],
      loading: false,
      searchText: '',
      filteredUsers: [],

      fetchRandomUsers: async (results = 10, page = 1) => {
  set({ loading: true })
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/random-users?results=${results}&page=${page}`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.ok) {
      const result = await response.json()
      const apiUsers = result.data || []

      const currentState = get()
      const localUsers = currentState.randomUsers.filter((user) => user.isLocal)

      let combinedUsers: RandomUser[]

      if (page === 1) {
        combinedUsers = [...apiUsers, ...localUsers]
      } else {
        const existingApiUsers = currentState.randomUsers.filter((u) => !u.isLocal)
        combinedUsers = [...existingApiUsers, ...apiUsers, ...localUsers]
      }

      set({ randomUsers: combinedUsers })
      get().updateFilteredUsers()
    } else {
      console.error('Failed to fetch random users')
    }
  } catch (error) {
    console.error('Error fetching random users:', error)
  } finally {
    set({ loading: false })
  }
},

      addLocalUser: (user) => {
        const newUser: RandomUser = {
          ...user,
          id: `local-${Date.now()}`,
          isLocal: true,
        }
        
        const currentState = get()
        const updatedUsers = [newUser,...currentState.randomUsers]
        
        set({ randomUsers: updatedUsers })
        get().updateFilteredUsers()
      },

      removeUser: (userId) => {
        const currentState = get()
        const updatedUsers = currentState.randomUsers.filter(user => 
          user.id !== userId
        )
        
        set({ randomUsers: updatedUsers })
        get().updateFilteredUsers()
      },

      setSearchText: (text) => {
        set({ searchText: text })
        get().updateFilteredUsers()
      },

      updateFilteredUsers: () => {
        const { randomUsers, searchText } = get()
        
        if (!searchText) {
          set({ filteredUsers: randomUsers })
          return
        }
        
        const filtered = randomUsers.filter(user =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.location.toLowerCase().includes(searchText.toLowerCase())
        )
        
        set({ filteredUsers: filtered })
      },

      clearAllData: () => {
        set({ 
          randomUsers: [], 
          filteredUsers: [], 
          searchText: '',
          loading: false 
        })
      }
    }),
    {
      name: 'user-data-store',
      partialize: (state) => ({ 
        randomUsers: state.randomUsers.filter(user => user.isLocal),
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.updateFilteredUsers()
        }
      },
    }
  )
)