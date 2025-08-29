export { useQRCodePanel } from './useQRCodePanel'

import { useEffect, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'

// Hook for automatic token refresh
export const useTokenRefresh = () => {
  const { token, refreshAuthToken, isAuthenticated } = useAuth()
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !token) {
      return
    }

    // Function to schedule next refresh
    const scheduleRefresh = () => {
      // Clear existing timeout
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }

      // Try to decode JWT to get expiration time
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const expirationTime = payload.exp * 1000 // Convert to milliseconds
        const currentTime = Date.now()
        const timeUntilExpiry = expirationTime - currentTime

        // Refresh token 5 minutes before it expires
        const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 60000) // At least 1 minute

        refreshTimeoutRef.current = setTimeout(async () => {
          try {
            await refreshAuthToken()
            // Schedule next refresh
            scheduleRefresh()
          } catch (error) {
            console.error('Failed to refresh token:', error)
            // If refresh fails, try again in 1 minute
            refreshTimeoutRef.current = setTimeout(scheduleRefresh, 60000)
          }
        }, refreshTime)

        console.log(`Token will be refreshed in ${Math.round(refreshTime / 1000 / 60)} minutes`)
      } catch (error) {
        console.error('Error parsing JWT token:', error)
        // Fallback: refresh every 30 minutes if we can't parse the token
        refreshTimeoutRef.current = setTimeout(async () => {
          try {
            await refreshAuthToken()
            scheduleRefresh()
          } catch (error) {
            console.error('Failed to refresh token:', error)
            refreshTimeoutRef.current = setTimeout(scheduleRefresh, 60000)
          }
        }, 30 * 60 * 1000)
      }
    }

    // Start scheduling refresh
    scheduleRefresh()

    // Cleanup on unmount
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
    }
  }, [token, isAuthenticated, refreshAuthToken])
}
