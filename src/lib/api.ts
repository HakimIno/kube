export interface QRCodeData {
  qr_code_image: string
  session_id: string
  expires_at: string
}

export interface QRCodeResponse {
  data: {
    qr_code: QRCodeData
  }
  message: string
  method: string
  path: string
  success: boolean
  timestamp: string
}

// Alternative interface in case the response structure is different
export interface QRCodeResponseAlt {
  data: QRCodeData
  message: string
  method: string
  path: string
  success: boolean
  timestamp: string
}

export interface QRCodeStatusData {
  session_id: string
  status: 'pending' | 'confirmed' | 'rejected' | 'expired' | 'failed'
  message: string
  user?: {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    role: string
    avatar: string
    is_active: boolean
    created_at: string
    updated_at: string
  }
  token?: string
  refresh_token?: string
}

export interface QRCodeStatusResponse {
  data: QRCodeStatusData
  message: string
  success: boolean
}

export interface UserMeData {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  role: string
  avatar: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserMeResponse {
  data: UserMeData
  message: string
  success: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  data: {
    token: string
    user: UserMeData
    refresh_token?: string
  }
  message: string
  success: boolean
}

export interface RefreshTokenResponse {
  data: {
    token: string
    user: UserMeData
  }
  message: string
  success: boolean
}

export interface LogoutRequest {
  refresh_token: string
}

export interface LogoutResponse {
  message: string
  success: boolean
}

export const generateQRCode = async (deviceInfo: string): Promise<QRCodeData> => {
  try {
    const response = await fetch('http://localhost:8081/api/v1/auth/qr/generate', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_info: deviceInfo,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to generate QR code: ${response.status} ${response.statusText}`)
    }

    const responseData = await response.json()

    if (responseData.data?.qr_code) {
      return responseData.data.qr_code
    } else if (responseData.data?.qr_code_image) {
      return responseData.data
    } else if (responseData.qr_code_image) {
      // QR code data at root level
      return responseData
    } else {
      console.error('Response structure:', responseData)
      throw new Error('Invalid response: QR code data is missing')
    }
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}

export const checkQRCodeStatus = async (sessionId: string): Promise<QRCodeStatusData> => {
  try {
    const response = await fetch(`http://localhost:8081/api/v1/auth/qr/status?session_id=${sessionId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to check QR code status: ${response.status} ${response.statusText}`)
    }

    const responseData: QRCodeStatusResponse = await response.json()

    if (!responseData.success) {
      throw new Error(responseData.message || 'Failed to check QR code status')
    }

    return responseData.data
  } catch (error) {
    console.error('Error checking QR code status:', error)
    throw error
  }
}

export const getUserMe = async (token: string): Promise<UserMeData> => {
  try {
    const response = await fetch('http://localhost:8081/api/v1/users/me', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get user data: ${response.status} ${response.statusText}`)
    }

    const responseData: UserMeResponse = await response.json()

    if (!responseData.success) {
      throw new Error(responseData.message || 'Failed to get user data')
    }

    return responseData.data
  } catch (error) {
    console.error('Error getting user data:', error)
    throw error
  }
}

export const loginUser = async (credentials: LoginRequest): Promise<{ token: string; user: UserMeData; refreshToken?: string }> => {
  try {
    const response = await fetch('http://localhost:8081/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      throw new Error(`Failed to login: ${response.status} ${response.statusText}`)
    }

    const responseData: LoginResponse = await response.json()

    if (!responseData.success) {
      throw new Error(responseData.message || 'Failed to login')
    }

    return {
      token: responseData.data.token,
      user: responseData.data.user,
      refreshToken: responseData.data.refresh_token
    }
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const refreshToken = async (currentToken: string): Promise<{ token: string; user: UserMeData }> => {
  try {
    const response = await fetch('http://localhost:8081/api/v1/auth/refresh', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${currentToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`)
    }

    const responseData: RefreshTokenResponse = await response.json()

    if (!responseData.success) {
      throw new Error(responseData.message || 'Failed to refresh token')
    }

    return {
      token: responseData.data.token,
      user: responseData.data.user
    }
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw error
  }
}

export const logoutUser = async (refreshToken: string): Promise<void> => {
  try {
    const response = await fetch('http://localhost:8081/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refreshToken
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to logout: ${response.status} ${response.statusText}`)
    }

    const responseData: LogoutResponse = await response.json()

    if (!responseData.success) {
      throw new Error(responseData.message || 'Failed to logout')
    }

    console.log('Logout successful:', responseData.message)
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}

// Utility function to make authenticated API calls with automatic token refresh
export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  const headers = {
    'accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  }

  let response = await fetch(url, {
    ...options,
    headers,
  })

  // If we get a 401 Unauthorized, try to refresh the token
  if (response.status === 401) {
    try {
      console.log('Token expired, attempting to refresh...')
      const { token: newToken, user: userData } = await refreshToken(token)
      
      // Update stored token and user data
      localStorage.setItem('token', newToken)
      localStorage.setItem('user', JSON.stringify({
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
      }))
      
      // Retry the original request with the new token
      const newHeaders = {
        'accept': 'application/json',
        'Authorization': `Bearer ${newToken}`,
        ...options.headers,
      }
      
      response = await fetch(url, {
        ...options,
        headers: newHeaders,
      })
      
      console.log('Token refreshed successfully')
    } catch (refreshError) {
      console.error('Failed to refresh token:', refreshError)
      // Clear stored auth data and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/auth/login'
      throw new Error('Authentication failed - please login again')
    }
  }

  return response
}

// Enhanced version that returns JSON data directly
export const authenticatedFetchJson = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await authenticatedFetch(url, options)
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }
  
  return response.json()
}

// Example API functions using authenticated fetch
export const getUserProfile = async () => {
  return authenticatedFetchJson<UserMeData>('http://localhost:8081/api/v1/users/me')
}

export const updateUserProfile = async (userData: Partial<UserMeData>) => {
  return authenticatedFetchJson<UserMeData>('http://localhost:8081/api/v1/users/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
}


