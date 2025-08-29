export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081',
  API_VERSION: 'v1',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/v1/auth/login',
      LOGOUT: '/api/v1/auth/logout',
      REFRESH: '/api/v1/auth/refresh',
      QR_GENERATE: '/api/v1/auth/qr/generate',
      QR_STATUS: '/api/v1/auth/qr/status',
    },
    USER: {
      ME: '/api/v1/users/me',
    },
  },
  TIMEOUT: 10000,
  RETRY_LIMIT: 3,
} as const

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}
