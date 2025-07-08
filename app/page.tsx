'use client'

import { useState } from 'react'
import { Share2, BarChart3, DollarSign } from 'lucide-react'
import ParametersPanel from './components/ParametersPanel'
import RequestsChart from './components/RequestsChart'
import ValueChart from './components/ValueChart'
import SummaryCards from './components/SummaryCards'
import ShareButton from './components/ShareButton'
import ToastNotification from './components/ToastNotification'

export default function Dashboard() {
  const [requestsPerMinute, setRequestsPerMinute] = useState(25000)
  const [timeRange, setTimeRange] = useState('1month')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const dataRequestCost = 0.005 // Fixed at $0.005

  const showToastNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-seda-deep-navy via-seda-navy to-seda-dark-blue">
      {/* Share Button - Fixed Top Right */}
      <ShareButton onShare={showToastNotification} />
      {/* Toast Notification */}
      {showToast && <ToastNotification message={toastMessage} />}
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            SEDA Data Request Dashboard
          </h1>
          <p className="text-lg md:text-xl text-seda-light-blue/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Simulate SEDA’s onchain economy with the data request volumes of its closest competitors.
          </p>
        </div>
        
        {/* Letterbox Parameters Panel (full width) */}
        <div className="mb-4">
          <ParametersPanel 
            requestsPerMinute={requestsPerMinute}
            setRequestsPerMinute={setRequestsPerMinute}
            dataRequestCost={dataRequestCost}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </div>
        {/* Summary Cards - now above the charts */}
        <div className="mb-4">
          <SummaryCards 
            requestsPerMinute={requestsPerMinute}
            timeRange={timeRange}
            dataRequestCost={dataRequestCost}
            showFullValue={true}
          />
        </div>
        {/* Middle Row - Charts Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <RequestsChart 
            requestsPerMinute={requestsPerMinute}
            timeRange={timeRange}
            dataRequestCost={dataRequestCost}
          />
          <ValueChart 
            requestsPerMinute={requestsPerMinute}
            timeRange={timeRange}
            dataRequestCost={dataRequestCost}
          />
        </div>
        
        {/* Disclaimer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500/60 max-w-2xl mx-auto leading-relaxed">
            *Based on an average data request price of $0.05. This figure incorporates the necessary computational functions required by the SEDA network to process data requests
          </p>
        </div>
      </div>
    </div>
  )
} 