'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  onShare: (message: string) => void
}

export default function ShareButton({ onShare }: ShareButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    
    // Check if native sharing is available (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SEDA Tokenomics Dashboard',
          text: 'Check out this interactive SEDA tokenomics dashboard!',
          url: url
        })
      } catch (error) {
        // User cancelled or error occurred, fall back to clipboard
        copyToClipboard(url)
      }
    } else {
      // Desktop - copy to clipboard
      copyToClipboard(url)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      onShare('Link copied to clipboard!')
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      onShare('Link copied to clipboard!')
    }
  }

  return (
    <button
      onClick={handleShare}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-6 right-6 z-40 p-3 bg-seda-glass backdrop-blur-glass border border-white/10 rounded-full shadow-xl transition-all duration-200 hover:bg-seda-glass-hover hover:border-seda-neon-teal/30 group"
      style={{
        boxShadow: isHovered 
          ? '0 8px 32px 0 rgba(0, 245, 212, 0.2)' 
          : '0 4px 16px 0 rgba(0, 245, 212, 0.1)'
      }}
      title="Share Dashboard"
    >
      <Share2 
        className={`w-5 h-5 transition-all duration-200 ${
          isHovered ? 'text-seda-neon-teal scale-110' : 'text-gray-300'
        }`}
      />
    </button>
  )
} 