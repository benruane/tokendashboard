'use client'

import { useMemo } from 'react'
import { DollarSign } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ValueChartProps {
  requestsPerMinute: number
  timeRange: string
  dataRequestCost: number
}

export default function ValueChart({ 
  requestsPerMinute, 
  timeRange, 
  dataRequestCost 
}: ValueChartProps) {
  const getTimeConfig = () => {
    switch (timeRange) {
      case '1day': return { total: 24, step: 2, unit: 'hour', label: 'Hours' }
      case '1week': return { total: 7, step: 1, unit: 'day', label: 'Days' }
      case '1month': return { total: 30, step: 2, unit: 'day', label: 'Days' }
      case '1year': return { total: 12, step: 1, unit: 'month', label: 'Months' }
      case '3years': return { total: 36, step: 3, unit: 'month', label: 'Months' }
      default: return { total: 30, step: 2, unit: 'day', label: 'Days' }
    }
  }

  // Generate sample data based on parameters
  const chartData = useMemo(() => {
    const config = getTimeConfig()
    const data = []
    
    for (let i = 0; i <= config.total; i += config.step) {
      let cumulativeRequests: number
      let cumulativeValue: number
      
      // Calculate based on time unit
      switch (config.unit) {
        case 'hour':
          cumulativeRequests = Math.round(requestsPerMinute * 60 * i)
          break
        case 'day':
          cumulativeRequests = Math.round(requestsPerMinute * 60 * 24 * i)
          break
        case 'month':
          cumulativeRequests = Math.round(requestsPerMinute * 60 * 24 * 30 * i)
          break
        default:
          cumulativeRequests = Math.round(requestsPerMinute * 60 * 24 * i)
      }
      
      cumulativeValue = Math.round(cumulativeRequests * dataRequestCost)
      
      data.push({
        timeUnit: i,
        value: cumulativeValue,
        label: config.unit === 'hour' ? `${i}h` : config.unit === 'month' ? `${i}mo` : `${i}d`
      })
    }
    
    // Always include the final time unit
    if (config.total > 0 && data[data.length - 1]?.timeUnit !== config.total) {
      let cumulativeRequests: number
      
      switch (config.unit) {
        case 'hour':
          cumulativeRequests = Math.round(requestsPerMinute * 60 * config.total)
          break
        case 'day':
          cumulativeRequests = Math.round(requestsPerMinute * 60 * 24 * config.total)
          break
        case 'month':
          cumulativeRequests = Math.round(requestsPerMinute * 60 * 24 * 30 * config.total)
          break
        default:
          cumulativeRequests = Math.round(requestsPerMinute * 60 * 24 * config.total)
      }
      
      const cumulativeValue = Math.round(cumulativeRequests * dataRequestCost)
      
      data.push({
        timeUnit: config.total,
        value: cumulativeValue,
        label: config.unit === 'hour' ? `${config.total}h` : config.unit === 'month' ? `${config.total}mo` : `${config.total}d`
      })
    }
    
    return data
  }, [requestsPerMinute, timeRange, dataRequestCost])

  const formatYAxis = (tickItem: number) => {
    if (tickItem >= 1000000000) return `$${(tickItem / 1000000000).toFixed(2)}B`
    if (tickItem >= 1000000) return `$${(tickItem / 1000000).toFixed(2)}M`
    if (tickItem >= 1000) return `$${(tickItem / 1000).toFixed(1)}K`
    return `$${tickItem.toLocaleString()}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="chart-tooltip">
          <p className="text-white font-semibold">{data.label}</p>
          <p className="text-seda-neon-teal">
            Value: ${data.value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="glass-panel glass-panel-hover p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-5 h-5 text-seda-neon-teal" />
        <h2 className="text-xl font-bold text-white">Cumulative USD Value Paid</h2>
      </div>
      
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f5d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0066ff" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="timeUnit" 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickFormatter={(value) => {
                const config = getTimeConfig()
                if (config.unit === 'hour') return value % 6 === 0 ? `${value}h` : ''
                if (config.unit === 'day') return value % 5 === 0 ? `${value}d` : ''
                if (config.unit === 'month') return value % 3 === 0 ? `${value}mo` : ''
                return value
              }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00f5d4"
              strokeWidth={2}
              fill="url(#valueGradient)"
              dot={{ fill: '#00f5d4', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#00f5d4', strokeWidth: 2, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 