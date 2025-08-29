'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // If user is already authenticated, redirect to home page
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading while checking authentication status
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="text-gray-600">กำลังโหลด...</span>
        </div>
      </div>
    )
  }

  // If user is authenticated, don't render the auth page content
  if (isAuthenticated) {
    return null
  }

  // If user is not authenticated, show the auth page
  return <>{children}</>
}

export default AuthGuard
