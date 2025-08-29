import { useState, useEffect } from 'react'
import { generateQRCode, checkQRCodeStatus, QRCodeStatusData } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface UseQRCodePanelOptions {
  deviceInfo?: string
}

const getDeviceInfo = (): string => {
  const { userAgent, platform, language } = navigator
  const screenResolution = typeof window !== 'undefined' && window.screen
    ? `${window.screen.width}x${window.screen.height}`
    : 'Unknown'

  return `Browser: ${userAgent.split(' ').slice(-2).join(' ')}, Platform: ${platform}, Language: ${language}, Screen: ${screenResolution}`
}

export const useQRCodePanel = ({ deviceInfo }: UseQRCodePanelOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [statusData, setStatusData] = useState<QRCodeStatusData | null>(null)
  const { loginWithToken, login } = useAuth()
  const router = useRouter()

  const finalDeviceInfo = deviceInfo || getDeviceInfo()

  const {
    data: qrData,
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['qr-code', finalDeviceInfo],
    queryFn: () => generateQRCode(finalDeviceInfo),
    enabled: isOpen,
    staleTime: 30000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      return failureCount < 2 && !(error instanceof Error && error.message.includes('Invalid response'))
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  // Status polling query
  const {
    data: currentStatus,
    error: statusError,
    refetch: refetchStatus
  } = useQuery({
    queryKey: ['qr-status', sessionId],
    queryFn: () => checkQRCodeStatus(sessionId!),
    enabled: !!sessionId && isOpen,
    refetchInterval: (query) => {
      // Stop polling if status is confirmed, rejected, expired, or failed
      const data = query.state.data
      if (data?.status === 'confirmed' || data?.status === 'rejected' || data?.status === 'expired' || data?.status === 'failed') {
        return false
      }
      // Poll every 5 seconds for pending status
      return 5000
    },
    refetchIntervalInBackground: false,
    retry: false,
  })

  // Update session ID when QR data is generated
  useEffect(() => {
    if (qrData?.session_id) {
      setSessionId(qrData.session_id)
    }
  }, [qrData])

  // Update status data when current status changes
  useEffect(() => {
    if (currentStatus) {
      setStatusData(currentStatus)
    }
  }, [currentStatus])

  // Handle successful authentication
  useEffect(() => {
    if (statusData?.status === 'confirmed') {
      if (statusData?.token) {
        // Use token-based authentication
        // Check if there's a refresh token in the response
        const refreshToken = statusData.refresh_token
        loginWithToken(statusData.token, refreshToken)
          .then(() => {
            // Close QR panel
            setIsOpen(false)
            setSessionId(null)
            setStatusData(null)
            
            // Redirect to home page
            router.push('/')
          })
          .catch((error) => {
            console.error('Error logging in with token:', error)
            // Fallback to user data if token fails
            if (statusData?.user) {
              const userData = {
                id: statusData.user.id,
                email: statusData.user.email,
                name: `${statusData.user.first_name} ${statusData.user.last_name}`,
                avatar: "/avatar-placeholder.svg"
              }
              login(userData)
              
              // Close QR panel
              setIsOpen(false)
              setSessionId(null)
              setStatusData(null)
              
              // Redirect to home page
              router.push('/')
            }
          })
      } else if (statusData?.user) {
        // Fallback to user data if no token
        const userData = {
          id: statusData.user.id,
          email: statusData.user.email,
          name: `${statusData.user.first_name} ${statusData.user.last_name}`,
          avatar: "/avatar-placeholder.svg"
        }
        
        login(userData)
        
        // Close QR panel
        setIsOpen(false)
        setSessionId(null)
        setStatusData(null)
        
        // Redirect to home page
        router.push('/')
      }
    }
  }, [statusData, loginWithToken, login, router])

  const togglePanel = () => {
    if (!isOpen) {
      refetch()
    } else {
      // Reset state when closing
      setSessionId(null)
      setStatusData(null)
    }
    setIsOpen(!isOpen)
  }

  const handleGenerateNew = () => {
    setSessionId(null)
    setStatusData(null)
    refetch()
  }

  return {
    isOpen,
    qrData,
    statusData,
    isLoading: isFetching,
    error: error || statusError,
    togglePanel,
    handleGenerateNew
  }
}
