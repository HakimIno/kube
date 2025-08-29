import ky from 'ky'
import { API_CONFIG } from '@/config/api'
import { storage } from '@/utils/storage'

// Create a base ky instance with default configuration
export const httpClient = ky.create({
  timeout: API_CONFIG.TIMEOUT,
  retry: {
    limit: API_CONFIG.RETRY_LIMIT,
    methods: ['get', 'post', 'put', 'patch', 'delete'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // Add default headers
        request.headers.set('Accept', 'application/json')
      },
    ],
    beforeRetry: [
      async ({ request, options, error, retryCount }) => {
        console.log(`Retrying request (${retryCount}): ${request.url}`)
      },
    ],
  },
})

// Create an authenticated ky instance
export const authenticatedClient = httpClient.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = storage.getToken()
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    beforeRetry: [
      async ({ request, options, error, retryCount }) => {
        // Handle 401 errors by attempting token refresh
        if (error.response?.status === 401 && retryCount === 1) {
          try {
            const currentToken = storage.getToken()
            if (currentToken) {
              // Import here to avoid circular dependency
              const { refreshToken } = await import('@/services/auth-service')
              const { token: newToken, user: userData } = await refreshToken(currentToken)
              
              storage.setToken(newToken)
              storage.setUser(userData)
              
              // Update the request with new token
              request.headers.set('Authorization', `Bearer ${newToken}`)
              return
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError)
            storage.clearAuth()
            window.location.href = '/auth/login'
            return ky.stop
          }
        }
      },
    ],
  },
})

// Utility function to handle API errors
export const handleApiError = (error: any): never => {
  if (error.response) {
    const status = error.response.status
    const message = error.message || `HTTP ${status}`
    
    switch (status) {
      case 401:
        storage.clearAuth()
        window.location.href = '/auth/login'
        throw new Error('Authentication required')
      case 403:
        throw new Error('Access denied')
      case 404:
        throw new Error('Resource not found')
      case 500:
        throw new Error('Internal server error')
      default:
        throw new Error(message)
    }
  }
  
  throw error
}
