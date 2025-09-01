import { httpClient, authenticatedClient, handleApiError } from '@/utils/http-client'
import { getApiUrl } from '@/config/api'
import { storage } from '@/utils/storage'
import {
  QRCodeData,
  QRCodeResponse,
  QRCodeResponseAlt,
  QRCodeStatusData,
  QRCodeStatusResponse,
  UserMeData,
  UserMeResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  LogoutResponse,
} from '@/types/auth'

export class AuthService {
  // QR Code Authentication
  static async generateQRCode(deviceInfo: string): Promise<QRCodeData> {
    try {
      const responseData = await httpClient
        .post(getApiUrl('/api/v1/auth/qr/generate'), {
          json: { device_info: deviceInfo },
        })
        .json<QRCodeResponse | QRCodeResponseAlt | QRCodeData>()

      if (responseData && typeof responseData === 'object' && 'data' in responseData) {
        const data = responseData.data
        if (data && typeof data === 'object' && 'qr_code' in data) {
          return (data as any).qr_code
        } else if (data && typeof data === 'object' && 'qr_code_image' in data) {
          return data as QRCodeData
        }
      } else if (responseData && typeof responseData === 'object' && 'qr_code_image' in responseData) {
        return responseData as QRCodeData
      }

      throw new Error('Invalid response structure')
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async checkQRCodeStatus(sessionId: string): Promise<QRCodeStatusData> {
    try {
      const responseData: QRCodeStatusResponse = await httpClient
        .get(getApiUrl(`/api/v1/auth/qr/status?session_id=${sessionId}`))
        .json()

      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to check QR code status')
      }

      return responseData.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // Traditional Login/Logout
  static async login(credentials: LoginRequest): Promise<{ token: string; user: UserMeData; refreshToken?: string }> {
    try {
      const responseData: LoginResponse = await httpClient
        .post(getApiUrl('/api/v1/auth/login'), {
          json: credentials,
        })
        .json()

      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to login')
      }

      // Store auth data
      storage.setToken(responseData.data.token)
      storage.setUser(responseData.data.user)
      if (responseData.data.refresh_token) {
        storage.setRefreshToken(responseData.data.refresh_token)
      }

      return {
        token: responseData.data.token,
        user: responseData.data.user,
        refreshToken: responseData.data.refresh_token,
      }
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async logout(passedAccessToken?: string, passedRefreshToken?: string): Promise<void> {
    try {
      const accessToken = passedAccessToken ?? storage.getToken()
      const refreshToken = passedRefreshToken ?? storage.getRefreshToken()

      const responseData: LogoutResponse = await httpClient
        .post(getApiUrl('/api/v1/auth/logout'), {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
          json: refreshToken ? { refresh_token: refreshToken } : undefined,
        })
        .json()

      if (!responseData.success) {
        console.warn('Logout API failed:', responseData.message)
      }

      storage.clearAuth()
    } catch (error) {
      // Even if logout API fails, clear local storage
      storage.clearAuth()
      console.error('Error during logout:', error)
    }
  }

  static async refreshToken(currentToken: string): Promise<{ token: string; user: UserMeData }> {
    try {
      const responseData: RefreshTokenResponse = await httpClient
        .post(getApiUrl('/api/v1/auth/refresh'), {
          headers: { Authorization: `Bearer ${currentToken}` },
        })
        .json()

      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to refresh token')
      }

      // Update stored data
      storage.setToken(responseData.data.token)
      storage.setUser(responseData.data.user)

      return {
        token: responseData.data.token,
        user: responseData.data.user,
      }
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // User Management
  static async getUserMe(): Promise<UserMeData> {
    try {
      const responseData: UserMeResponse = await authenticatedClient
        .get(getApiUrl('/api/v1/users/me'))
        .json()

      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to get user data')
      }

      return responseData.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // Utility methods
  static isAuthenticated(): boolean {
    return storage.isAuthenticated()
  }

  static getCurrentUser() {
    return storage.getUser()
  }

  static getCurrentToken(): string | null {
    return storage.getToken()
  }
}

// Export individual functions for backward compatibility
export const generateQRCode = AuthService.generateQRCode
export const checkQRCodeStatus = AuthService.checkQRCodeStatus
export const loginUser = AuthService.login
export const logoutUser = AuthService.logout
export const refreshToken = AuthService.refreshToken
export const getUserMe = AuthService.getUserMe
