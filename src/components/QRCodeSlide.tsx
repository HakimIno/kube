'use client'

import React from 'react'
import { useQRCodePanel } from '@/hooks/useQRCodePanel'
import { QRCodeDisplay } from './QRCodeDisplay'
import { Icon } from '@iconify/react/dist/iconify.js'

interface QRCodeSlideProps {
  deviceInfo?: string
}

export const QRCodeSlide: React.FC<QRCodeSlideProps> = ({
  deviceInfo = 'Web App v1.0'
}) => {
  const {
    isOpen,
    qrData,
    isLoading,
    error,
    togglePanel,
    handleGenerateNew
  } = useQRCodePanel({ deviceInfo })

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className="fixed top-4 right-4 z-40 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        title="QR Code Login"
      >
        <Icon
          icon="mdi:qrcode"
          className="w-5 h-5"
        />
      </button>

      {/* Slide Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-violet-950 via-black/95 to-indigo-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out rounded-l-2xl overflow-hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
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
              <QRCodeDisplay
                qrData={qrData}
                isLoading={isLoading}
                error={error}
                onGenerateNew={handleGenerateNew}
              />
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
