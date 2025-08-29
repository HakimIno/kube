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
