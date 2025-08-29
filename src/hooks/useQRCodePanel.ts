import { useState } from 'react'
import { generateQRCode } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

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

  const togglePanel = () => {
    refetch()
    setIsOpen(!isOpen)
  }

  const handleGenerateNew = () => {
    refetch()
  }

  return {
    isOpen,
    qrData,
    isLoading: isFetching,
    error,
    togglePanel,
    handleGenerateNew
  }
}
