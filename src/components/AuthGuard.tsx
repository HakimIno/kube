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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-indigo-900">
        <div className="flex flex-col items-center space-x-2 gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
          <span className="text-gray-600 text-xs">กำลังโหลด...</span>
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
