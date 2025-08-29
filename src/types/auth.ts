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
  user?: UserMeData
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
