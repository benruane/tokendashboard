'use client'

import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface ToastNotificationProps {
  message: string
}

export default function ToastNotification({ message }: ToastNotificationProps) {
  useEffect(() => {
    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      // The parent component will handle hiding
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="toast-notification">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-seda-neon-teal" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )
} 