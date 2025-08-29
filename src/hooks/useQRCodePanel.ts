import { useState } from 'react'
import { generateQRCode } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

interface UseQRCodePanelOptions {
  deviceInfo?: string
}

export const useQRCodePanel = ({ deviceInfo = 'Web App v1.0' }: UseQRCodePanelOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    data: qrData,
    isLoading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['qr-code', deviceInfo],
    queryFn: () => generateQRCode(deviceInfo),
    enabled: isOpen,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Retry up to 2 times for network errors
      return failureCount < 2 && !(error instanceof Error && error.message.includes('Invalid response'))
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  const togglePanel = () => {
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
