'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { generateQRCode, QRCodeData } from '@/lib/api'
import { Icon } from '@iconify/react/dist/iconify.js'

interface QRCodeSlideProps {
  deviceInfo?: string
}

export const QRCodeSlide: React.FC<QRCodeSlideProps> = ({
  deviceInfo = 'Web App v1.0'
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const {
    data: qrData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['qr-code', deviceInfo],
    queryFn: () => generateQRCode(deviceInfo),
    enabled: isOpen, // Only fetch when panel is open
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

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className="absolute top-4 right-4 z-10 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        title="QR Code Login"
      >
        <Icon
          icon="mdi:qrcode"
          className="w-5 h-5"
        />
      </button>


      <div
        className={`absolute top-0 right-0 h-screen max-h-[600px] w-72 bg-gradient-to-br from-violet-950 via-black/95 to-indigo-950 shadow-2xl z-20 transform transition-transform duration-300 ease-in-out rounded-r-2xl overflow-hidden ${
          isOpen ? 'translate-x-0 hidden' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">QR Code Login</h2>
          <button
            onClick={togglePanel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          <div className="space-y-6">
            {/* Instructions */}
            <div className="text-center">
              <p className="text-gray-300 text-sm mb-4">
                Scan this QR code with your mobile app to login instantly
              </p>
              <button
                onClick={handleGenerateNew}
                disabled={isLoading}
                className="text-indigo-400 hover:text-indigo-300 text-sm underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate New Code
              </button>
            </div>

            {/* QR Code Display */}
            <div className="flex flex-col items-center space-y-4">
              {isLoading && (
                <div className="flex items-center justify-center w-64 h-64 bg-white/10 rounded-lg">
                  <div className="flex flex-col items-center space-y-2">
                    <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-gray-400 text-sm">Generating QR Code...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-center justify-center w-64 h-64 bg-red-900/20 border border-red-500/50 rounded-lg">
                  <div className="text-center">
                    <Icon icon="mdi:alert-circle" className="w-12 h-12 text-red-400 mx-auto mb-2" />
                    <p className="text-red-300 text-sm">Failed to generate QR code</p>
                    <button
                      onClick={handleGenerateNew}
                      className="text-red-400 hover:text-red-300 text-sm underline mt-2"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {qrData && !isLoading && (
                <div className="space-y-4">
                  {/* QR Code Image */}
                  <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
                    <img
                      src={(qrData as QRCodeData).qr_code_image}
                      alt="QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Session Info */}
                  <div className="text-center space-y-2">
                    <p className="text-xs text-gray-400">
                      Session ID: <span className="font-mono text-gray-300">{(qrData as QRCodeData).session_id}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Expires: <span className="font-mono text-gray-300">
                        {new Date((qrData as QRCodeData).expires_at).toLocaleTimeString()}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-4">
              <h3 className="text-white font-medium mb-2 text-sm">How to use:</h3>
              <ol className="text-xs text-gray-300 space-y-1">
                <li>1. Open your mobile app</li>
                <li>2. Go to QR Scanner</li>
                <li>3. Scan the code above</li>
                <li>4. You'll be logged in automatically</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
