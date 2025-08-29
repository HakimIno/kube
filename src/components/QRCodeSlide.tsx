'use client'

import React from 'react'
import { QRCodeData, QRCodeStatusData } from '@/lib/api'
import { QRCodeDisplay } from './QRCodeDisplay'

interface QRCodeSlideProps {
  isOpen: boolean
  qrData: QRCodeData | undefined
  statusData: QRCodeStatusData | null
  isLoading: boolean
  error: Error | null
  onGenerateNew: () => void
}

export const QRCodeSlide: React.FC<QRCodeSlideProps> = ({
  isOpen,
  qrData,
  statusData,
  isLoading,
  error,
  onGenerateNew
}) => {
  const getStatusMessage = () => {
    if (!statusData) return 'Waiting for scan...'
    
    switch (statusData.status) {
      case 'pending':
        return 'Waiting for scan...'
      case 'confirmed':
        return 'Login successful! Redirecting...'
      case 'rejected':
        return 'Login rejected. Please try again.'
      case 'expired':
        return 'QR code expired. Please generate a new one.'
      case 'failed':
        return 'Login failed. Please try again.'
      default:
        return 'Unknown status'
    }
  }

  const getStatusColor = () => {
    if (!statusData) return 'text-gray-400'
    
    switch (statusData.status) {
      case 'pending':
        return 'text-gray-400'
      case 'confirmed':
        return 'text-green-400'
      case 'rejected':
        return 'text-red-400'
      case 'expired':
        return 'text-red-400'
      case 'failed':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <>
      {/* Slide Panel */}
      {isOpen && (
        <div
          className={`absolute  top-0 right-0 h-full w-80 bg-gradient-to-br from-black via-black/95 to-indigo-800 shadow-2xl  transform transition-transform duration-300 ease-in-out rounded-r-2xl overflow-hidden translate-x-full z-50
            }`}
        >
          {/* Content */}
          <div className="p-6 h-full overflow-y-auto">
            <div className="space-y-6">
              {/* Instructions */}
              <div className="text-center">
                <p className="text-gray-300 text-sm mb-2">
                  Scan this QR code with your mobile app to login instantly
                </p>
                <button
                  onClick={onGenerateNew}
                  disabled={isLoading}
                  className="text-indigo-400 hover:text-indigo-300 text-sm underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate New Code
                </button>
              </div>

              {/* QR Code Display */}
              <div className="flex flex-col items-center space-y-4">
                <QRCodeDisplay
                  qrData={qrData}
                  isLoading={isLoading}
                  error={error}
                  onGenerateNew={onGenerateNew}
                />
              </div>

              {/* Status Display */}
              {qrData && (
                <div className="text-center space-y-2">
                  <div className={`text-sm font-medium ${getStatusColor()}`}>
                    {getStatusMessage()}
                  </div>

                  {statusData?.status === 'confirmed' && (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">Success!</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
