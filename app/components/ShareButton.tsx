'use client'

import { useState } from 'react'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
  onShare: (message: string) => void
}

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" color="white" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M17.53 3.5h3.71l-7.98 9.14L22.5 20.5h-6.19l-4.85-5.97-5.54 5.97H2.21l8.5-9.16L1.5 3.5h6.37l4.36 5.37 5.3-5.37zm-1.09 15.13h1.03l-6.56-8.08-1.13-1.39H7.8l6.64 8.08 1.13 1.39z" fill="white"/>
  </svg>
)

export default function ShareButton({ onShare }: ShareButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isXHovered, setIsXHovered] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SEDA Tokenomics Dashboard',
          text: 'Check out this interactive SEDA tokenomics dashboard!',
          url: url
        })
      } catch (error) {
        copyToClipboard(url)
      }
    } else {
      copyToClipboard(url)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      onShare('Link copied to clipboard!')
    } catch (error) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      onShare('Link copied to clipboard!')
    }
  }

  const handleXShare = () => {
    const url = window.location.href
    const text = `Simulate SEDA’s onchain economy with the data request volumes of its closest competitors on this cool dashboard! 🚀 ${url}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex gap-3">
      <button
        onClick={handleShare}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="p-3 bg-seda-glass backdrop-blur-glass border border-white/10 rounded-full shadow-xl transition-all duration-200 hover:bg-seda-glass-hover hover:border-seda-neon-teal/30 group"
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
      <button
        onClick={handleXShare}
        onMouseEnter={() => setIsXHovered(true)}
        onMouseLeave={() => setIsXHovered(false)}
        className="p-3 bg-seda-glass backdrop-blur-glass border border-white/10 rounded-full shadow-xl transition-all duration-200 hover:bg-seda-glass-hover hover:border-blue-500 group"
        style={{
          boxShadow: isXHovered 
            ? '0 8px 32px 0 rgba(29, 155, 240, 0.2)' 
            : '0 4px 16px 0 rgba(29, 155, 240, 0.1)'
        }}
        title="Share on X (Twitter)"
      >
        <XIcon />
      </button>
    </div>
  )
} 