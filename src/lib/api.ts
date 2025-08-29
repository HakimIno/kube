// Re-export everything from the new structure for backward compatibility
export * from '@/types/auth'
export * from '@/services/auth-service'
export * from '@/services/user-service'
export * from '@/utils/storage'
export * from '@/utils/http-client'

// Legacy exports for backward compatibility
import { AuthService, UserService } from '@/services'

// Legacy function names
export const generateQRCode = AuthService.generateQRCode
export const checkQRCodeStatus = AuthService.checkQRCodeStatus
export const loginUser = AuthService.login
export const logoutUser = AuthService.logout
export const refreshToken = AuthService.refreshToken
export const getUserMe = AuthService.getUserMe
export const getUserProfile = UserService.getProfile
export const updateUserProfile = UserService.updateProfile

// Legacy authenticated fetch functions (deprecated - use services instead)
import { authenticatedClient, handleApiError } from '@/utils/http-client'
import { getApiUrl } from '@/config/api'

export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  try {
    const response = await authenticatedClient(url, {
      ...options,
    })
    return response as Response
  } catch (error) {
    throw handleApiError(error)
  }
}

export const authenticatedFetchJson = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    return await authenticatedClient(url, {
      ...options,
    }).json<T>()
  } catch (error) {
    throw handleApiError(error)
  }
}


