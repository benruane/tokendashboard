'use client'

import { useMemo, useRef } from 'react'
import { Users, Flame } from 'lucide-react'

interface SummaryCardsProps {
  requestsPerMinute: number
  timeRange: string
  dataRequestCost: number
  showFullValue?: boolean
}

export default function SummaryCards({ 
  requestsPerMinute, 
  timeRange, 
  dataRequestCost,
  showFullValue = false,
}: SummaryCardsProps) {
  const calculations = useMemo(() => {
    const getDaysFromRange = () => {
      switch (timeRange) {
        case '1day': return 1
        case '1week': return 7
        case '1month': return 30
        case '1year': return 365
        case '3years': return 1095
        default: return 30
      }
    }

    const days = getDaysFromRange()
    const cumulativeRequests = Math.round(requestsPerMinute * 60 * 24 * days)
    const totalValue = Math.round(cumulativeRequests * dataRequestCost)
    
    // 50% goes to SEDA Delegation, 50% gets burned
    const sedaDelegationValue = Math.round(totalValue * 0.5)
    const sedaBurnedValue = Math.round(totalValue * 0.5)

    return {
      sedaDelegationValue,
      sedaBurnedValue,
      cumulativeRequests,
      totalValue
    }
  }, [requestsPerMinute, timeRange, dataRequestCost])

  const formatCurrency = (value: number) => {
    if (showFullValue) return `$${value.toLocaleString()}`
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
    return `$${value.toLocaleString()}`
  }

  const delegationAudioRef = useRef<HTMLAudioElement>(null)
  const burnedAudioRef = useRef<HTMLAudioElement>(null)

  const playDelegationSound = () => {
    if (delegationAudioRef.current) {
      delegationAudioRef.current.currentTime = 0
      delegationAudioRef.current.play()
    }
  }
  const stopDelegationSound = () => {
    if (delegationAudioRef.current) {
      delegationAudioRef.current.pause()
      delegationAudioRef.current.currentTime = 0
    }
  }
  const playBurnedSound = () => {
    if (burnedAudioRef.current) {
      burnedAudioRef.current.currentTime = 0
      burnedAudioRef.current.play()
    }
  }
  const stopBurnedSound = () => {
    if (burnedAudioRef.current) {
      burnedAudioRef.current.pause()
      burnedAudioRef.current.currentTime = 0
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* SEDA Delegation Card */}
      <div
        className="glass-panel p-8 group flex flex-col items-center text-center hover:bg-seda-glass-hover hover:border-seda-neon-teal/30 transition-all duration-200"
        onMouseEnter={playDelegationSound}
        onMouseLeave={stopDelegationSound}
      >
        <audio ref={delegationAudioRef} src="/counting.wav" preload="auto" />
        <div className="p-2 bg-seda-neon-teal/10 rounded-lg group-hover:bg-seda-neon-teal/20 transition-all duration-200 mb-2">
          <Users className="w-5 h-5 text-seda-neon-teal" />
        </div>
        <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white mb-4">
          USD Value of SEDA Distributed to SEDA Delegation
        </h3>
        <div className="mb-2">
          <div className="text-3xl md:text-4xl font-bold text-seda-mint mb-2">
            {formatCurrency(calculations.sedaDelegationValue)}
          </div>
        </div>
      </div>

      {/* SEDA Burned Card */}
      <div
        className="glass-panel p-8 group flex flex-col items-center text-center hover:bg-seda-glass-hover hover:border-red-400/30 transition-all duration-200"
        style={{
          boxShadow: '0 8px 32px 0 rgba(239, 68, 68, 0.1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(239, 68, 68, 0.2)'
          playBurnedSound()
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(239, 68, 68, 0.1)'
          stopBurnedSound()
        }}
      >
        <audio ref={burnedAudioRef} src="/burn.wav" preload="auto" />
        <div className="p-2 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-all duration-200 mb-2">
          <Flame className="w-5 h-5 text-red-400" />
        </div>
        <h3 className="text-sm md:text-base lg:text-lg font-semibold text-white mb-4">
          USD Value of SEDA Burned from the Circulating Supply
        </h3>
        <div className="mb-2">
          <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2">
            {formatCurrency(calculations.sedaBurnedValue)}
          </div>
        </div>
      </div>
    </div>
  )
} 