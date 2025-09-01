'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthService } from '@/services'
import { storage, StoredUser } from '@/utils/storage'
import { UserMeData } from '@/types/auth'
import { useTokenRefresh } from '@/hooks'

interface User {
  id: number
  email: string
  name: string
  avatar: string
  username?: string
  first_name?: string
  last_name?: string
  role?: string
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  loginWithToken: (token: string, refreshToken?: string) => Promise<void>
  login: (userData: User) => void
  logout: () => Promise<void>
  refreshAuthToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

// Helper function to transform UserMeData to User
const transformUserData = (userData: UserMeData): User => ({
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
})

// Helper function to transform StoredUser to User
const transformStoredUser = (storedUser: StoredUser): User => ({
  id: storedUser.id,
  email: storedUser.email,
  name: storedUser.name,
  avatar: storedUser.avatar,
  username: storedUser.username,
  first_name: storedUser.first_name,
  last_name: storedUser.last_name,
  role: storedUser.role,
  is_active: storedUser.is_active,
  created_at: storedUser.created_at,
  updated_at: storedUser.updated_at,
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to update auth state
  const updateAuthState = (userData: User, authToken: string) => {
    setUser(userData)
    setToken(authToken)
  }

  // Function to clear auth state
  const clearAuthState = () => {
    setUser(null)
    setToken(null)
    storage.clearAuth()
  }

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = () => {
      try {
        const storedUser = storage.getUser()
        const storedToken = storage.getToken()
        
        if (storedUser && storedToken) {
          const user = transformStoredUser(storedUser)
          updateAuthState(user, storedToken)
        }
      } catch (error) {
        console.error('Error checking auth state:', error)
        clearAuthState()
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const loginWithToken = async (authToken: string, refreshToken?: string) => {
    try {
      setIsLoading(true)
      
      // Store token first
      storage.setToken(authToken)
      if (refreshToken) {
        storage.setRefreshToken(refreshToken)
      }
      
      // Get user data from API
      const userData = await AuthService.getUserMe()
      const user = transformUserData(userData)
      
      // Store user data
      storage.setUser(userData)
      updateAuthState(user, authToken)
      
    } catch (error) {
      console.error('Error logging in with token:', error)
      clearAuthState()
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAuthToken = async () => {
    const currentToken = storage.getToken()
    if (!currentToken) {
      throw new Error('No token available to refresh')
    }

    try {
      const { token: newToken, user: userData } = await AuthService.refreshToken(currentToken)
      const user = transformUserData(userData)
      
      updateAuthState(user, newToken)
      console.log('Token refreshed successfully')
    } catch (error) {
      console.error('Error refreshing token:', error)
      clearAuthState()
      throw error
    }
  }

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    const accessToken = storage.getToken()
    const refreshToken = storage.getRefreshToken()
    clearAuthState()
    if (typeof window !== 'undefined') {
      window.location.replace('/auth/login')
    }
    try {
      await AuthService.logout(accessToken || undefined, refreshToken || undefined)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    token,
    loginWithToken,
    login,
    logout,
    refreshAuthToken
  }

  return (
    <AuthContext.Provider value={value}>
      <TokenRefreshWrapper>
        {children}
      </TokenRefreshWrapper>
    </AuthContext.Provider>
  )
}

// Wrapper component to use the token refresh hook
const TokenRefreshWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  useTokenRefresh()
  return <>{children}</>
} 