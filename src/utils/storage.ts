import { UserMeData } from '@/types/auth'

const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  REFRESH_TOKEN: 'refresh_token',
} as const

export interface StoredUser {
  id: number
  email: string
  name: string
  avatar: string
  username: string
  first_name: string
  last_name: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export const storage = {
  // Token management
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
  },

  // User management
  getUser: (): StoredUser | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)
    if (!userStr) return null
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },

  setUser: (userData: UserMeData): void => {
    if (typeof window === 'undefined') return
    const storedUser: StoredUser = {
      id: userData.id,
      email: userData.email,
      name: `${userData.first_name} ${userData.last_name}`.trim() || userData.username,
      avatar: userData.avatar,
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role,
      is_active: userData.is_active,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
    }
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(storedUser))
  },

  removeUser: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEYS.USER)
  },

  // Refresh token management
  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  },

  setRefreshToken: (refreshToken: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  },

  removeRefreshToken: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  },

  // Clear all auth data
  clearAuth: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!storage.getToken()
  },
}
