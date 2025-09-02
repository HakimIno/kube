import React from 'react'
import { QRCodeData } from '@/lib/api'
import { Icon } from '@iconify/react/dist/iconify.js'

interface QRCodeDisplayProps {
  qrData: QRCodeData | undefined
  isLoading: boolean
  error: Error | null
  onGenerateNew: () => void
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  qrData,
  isLoading,
  error,
  onGenerateNew
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-64 h-64 bg-white/10 rounded-lg">
        <div className="flex flex-col items-center space-y-2">
          <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-400 text-sm">Generating QR Code...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-64 h-64 bg-red-900/20 border border-red-500/50 rounded-lg">
        <div className="text-center">
          <Icon icon="mdi:alert-circle" className="w-12 h-12 text-red-400 mx-auto mb-2" />
          <p className="text-red-300 text-sm">Failed to generate QR code</p>
          <button
            onClick={onGenerateNew}
            className="text-red-400 hover:text-red-300 text-sm underline mt-2"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!qrData) {
    return null
  }

  return (
    <div className="space-y-4 ">
      <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
        <img
          src={qrData.qr_code_image}
          alt="QR Code"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}
