'use client'

import React from 'react'
import { QRCodeData } from '@/lib/api'
import { QRCodeDisplay } from './QRCodeDisplay'

interface QRCodeSlideProps {
  isOpen: boolean
  qrData: QRCodeData | undefined
  isLoading: boolean
  error: Error | null
  onGenerateNew: () => void
}

export const QRCodeSlide: React.FC<QRCodeSlideProps> = ({
  isOpen,
  qrData,
  isLoading,
  error,
  onGenerateNew
}) => {
  return (
    <>
      {/* Slide Panel */}
      {isOpen && (
        <div
          className={`absolute top-0 right-0 h-full w-80 bg-gradient-to-br from-black via-black/95 to-indigo-800 shadow-2xl  transform transition-transform duration-300 ease-in-out rounded-r-2xl overflow-hidden translate-x-full z-50
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
