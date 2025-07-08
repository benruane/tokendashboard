'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'

interface ParametersPanelProps {
  requestsPerMinute: number
  setRequestsPerMinute: (value: number) => void
  dataRequestCost: number
  timeRange: string
  setTimeRange: (value: string) => void
}

const timeRanges = [
  { value: '1day', label: '1 Day' },
  { value: '1week', label: '1 Week' },
  { value: '1month', label: '1 Month' },
  { value: '1year', label: '1 Year' },
  { value: '3years', label: '3 Years' },
]

export default function ParametersPanel({ 
  requestsPerMinute, 
  setRequestsPerMinute, 
  dataRequestCost,
  timeRange,
  setTimeRange,
}: ParametersPanelProps) {
  const [isDragging, setIsDragging] = useState(false)

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getTickPosition = (value: number) => {
    const min = 2500
    const max = 200000
    return ((value - min) / (max - min)) * 100
  }

  return (
    <div className="glass-panel glass-panel-hover p-6 w-full flex flex-col gap-6">
      <div className="flex items-center gap-3 mb-2">
        <Settings className="w-5 h-5 text-seda-neon-teal" />
        <h2 className="text-xl font-bold text-white">Parameters</h2>
      </div>
      {/* Slider and Benchmarks Row */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-300">
            Average Requests per Minute
          </label>
          <span className="text-sm text-gray-400">Gas Cost per Data Request: $0.005<sup>*</sup></span>
        </div>
        <div className="relative w-full">
          {/* Slider Track */}
          <div className="relative h-2 bg-seda-dark-blue rounded-full">
            <div 
              className="absolute h-full bg-gradient-to-r from-seda-neon-teal to-seda-blue rounded-full transition-all duration-200"
              style={{ width: `${getTickPosition(requestsPerMinute)}%` }}
            />
            {/* Tick Marks */}
            <div 
              className="absolute top-0 w-1 h-2 bg-red-500 rounded-full"
              style={{ left: `${getTickPosition(7800)}%` }}
              title="Redstone"
            />
            <div 
              className="absolute top-0 w-1 h-2 bg-blue-500 rounded-full"
              style={{ left: `${getTickPosition(28560)}%` }}
              title="Chainlink"
            />
            <div 
              className="absolute top-0 w-1 h-2 bg-purple-500 rounded-full"
              style={{ left: `${getTickPosition(194444)}%` }}
              title="Pyth"
            />
          </div>
          {/* Slider Input */}
          <input
            type="range"
            min="2500"
            max="200000"
            value={requestsPerMinute}
            onChange={(e) => setRequestsPerMinute(Number(e.target.value))}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="absolute top-0 w-full h-8 opacity-0 cursor-pointer z-10"
            style={{ pointerEvents: 'auto', marginTop: '-12px' }}
          />
          {/* Custom Thumb */}
          <div 
            className={`absolute top-1/2 w-6 h-6 bg-seda-neon-teal rounded-full border-2 border-white transform -translate-y-1/2 -translate-x-1/2 transition-all duration-200 pointer-events-none ${
              isDragging ? 'scale-110 shadow-lg' : 'scale-100'
            }`}
            style={{ 
              left: `${getTickPosition(requestsPerMinute)}%`,
              boxShadow: isDragging ? '0 0 20px rgba(0, 245, 212, 0.8)' : '0 0 10px rgba(0, 245, 212, 0.5)'
            }}
          />
        </div>
        {/* Value Display */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-400">2.5K</span>
          <div className="text-center">
            <div className="text-lg font-bold text-seda-neon-teal">
              {formatNumber(requestsPerMinute)}
            </div>
            <div className="text-xs text-gray-400">requests/min</div>
          </div>
          <span className="text-xs text-gray-400">200K</span>
        </div>
        {/* Horizontal Benchmarks */}
        <div className="flex flex-row gap-6 justify-center mt-2">
          <button 
            onClick={() => setRequestsPerMinute(7800)}
            className={`min-w-[8rem] flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-red-500 font-semibold text-gray-200 shadow-sm transition-colors duration-200 cursor-pointer group focus:outline-none ${requestsPerMinute === 7800 ? 'bg-red-500/20' : 'bg-seda-glass hover:bg-red-500/20 hover:text-red-400'}`}
          >
            <span>Competitor 1</span>
          </button>
          <button 
            onClick={() => setRequestsPerMinute(28560)}
            className={`min-w-[8rem] flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-blue-500 font-semibold text-gray-200 shadow-sm transition-colors duration-200 cursor-pointer group focus:outline-none ${requestsPerMinute === 28560 ? 'bg-blue-500/20' : 'bg-seda-glass hover:bg-blue-500/20 hover:text-blue-400'}`}
          >
            <span>Competitor 2</span>
          </button>
          <button 
            onClick={() => setRequestsPerMinute(194444)}
            className={`min-w-[8rem] flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-purple-500 font-semibold text-gray-200 shadow-sm transition-colors duration-200 cursor-pointer group focus:outline-none ${requestsPerMinute === 194444 ? 'bg-purple-500/20' : 'bg-seda-glass hover:bg-purple-500/20 hover:text-purple-400'}`}
          >
            <span>Competitor 3</span>
          </button>
        </div>
      </div>
      {/* Time Range Selector Inline */}
      <div className="flex flex-row gap-2 justify-center mt-4">
        {timeRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              timeRange === range.value
                ? 'bg-seda-neon-teal text-seda-deep-navy shadow-lg'
                : 'bg-seda-glass text-gray-300 hover:bg-seda-glass-hover hover:text-white hover:border-seda-neon-teal/30 border border-transparent'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  )
} 