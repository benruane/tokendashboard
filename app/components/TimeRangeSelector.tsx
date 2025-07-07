'use client'

import { Calendar } from 'lucide-react'

interface TimeRangeSelectorProps {
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

export default function TimeRangeSelector({ timeRange, setTimeRange }: TimeRangeSelectorProps) {
  return (
    <div className="glass-panel glass-panel-hover p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="w-5 h-5 text-seda-neon-teal" />
        <h2 className="text-xl font-bold text-white">Time Range</h2>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
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