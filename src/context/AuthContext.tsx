'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getUserMe, UserMeData, refreshToken, logoutUser } from '@/lib/api'
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
  refreshToken: string | null
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Function to update user and token state
  const updateAuthState = (userData: User, authToken: string, refreshToken?: string) => {
    setUser(userData)
    setToken(authToken)
    if (refreshToken) {
      setRefreshTokenValue(refreshToken)
      localStorage.setItem('refreshToken', refreshToken)
    }
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', authToken)
  }

  // Function to clear auth state
  const clearAuthState = () => {
    setUser(null)
    setToken(null)
    setRefreshTokenValue(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        const storedRefreshToken = localStorage.getItem('refreshToken')
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setToken(storedToken)
          if (storedRefreshToken) {
            setRefreshTokenValue(storedRefreshToken)
          }
        }
      } catch (error) {
        console.error('Error parsing stored auth data:', error)
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
      
      // Call the /api/v1/users/me endpoint to get user data
      const userData: UserMeData = await getUserMe(authToken)
      
      // Transform the API response to match our User interface
      const user: User = {
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
      
      updateAuthState(user, authToken, refreshToken)
      
    } catch (error) {
      console.error('Error logging in with token:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const refreshAuthToken = async () => {
    if (!token) {
      throw new Error('No token available to refresh')
    }

    try {
      const { token: newToken, user: userData } = await refreshToken(token)
      
      // Transform the API response to match our User interface
      const user: User = {
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
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = async () => {
    try {
      // If we have a refresh token, try to logout from server
      if (refreshTokenValue) {
        await logoutUser(refreshTokenValue)
      }
    } catch (error) {
      console.error('Error during server logout:', error)
      // Continue with local logout even if server logout fails
    } finally {
      clearAuthState()
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    token,
    refreshToken: refreshTokenValue,
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