import { authenticatedClient, handleApiError } from '@/utils/http-client'
import { getApiUrl } from '@/config/api'
import { UserMeData, UserMeResponse } from '@/types/auth'

export interface UpdateUserRequest {
  first_name?: string
  last_name?: string
  email?: string
  avatar?: string
}

export class UserService {
  static async getProfile(): Promise<UserMeData> {
    try {
      const responseData: UserMeResponse = await authenticatedClient
        .get(getApiUrl('/api/v1/users/me'))
        .json()

      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to get user profile')
      }

      return responseData.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async updateProfile(userData: UpdateUserRequest): Promise<UserMeData> {
    try {
      const responseData: UserMeResponse = await authenticatedClient
        .put(getApiUrl('/api/v1/users/me'), {
          json: userData,
        })
        .json()

      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to update user profile')
      }

      return responseData.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const response = await authenticatedClient
        .post(getApiUrl('/api/v1/users/change-password'), {
          json: {
            current_password: currentPassword,
            new_password: newPassword,
          },
        })
        .json<{ success: boolean; message?: string }>()

      if (!response.success) {
        throw new Error(response.message || 'Failed to change password')
      }
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async deleteAccount(password: string): Promise<void> {
    try {
      const response = await authenticatedClient
        .delete(getApiUrl('/api/v1/users/me'), {
          json: { password },
        })
        .json<{ success: boolean; message?: string }>()

      if (!response.success) {
        throw new Error(response.message || 'Failed to delete account')
      }
    } catch (error) {
      throw handleApiError(error)
    }
  }
}

// Export individual functions for backward compatibility
export const getUserProfile = UserService.getProfile
export const updateUserProfile = UserService.updateProfile
