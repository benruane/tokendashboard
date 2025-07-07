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
        {/* Letterbox Parameters Panel (full width) */}
        <div className="mb-8">
          <ParametersPanel 
            requestsPerMinute={requestsPerMinute}
            setRequestsPerMinute={setRequestsPerMinute}
            dataRequestCost={dataRequestCost}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </div>
        {/* Middle Row - Charts Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
        {/* Bottom Row - Summary Cards */}
        <SummaryCards 
          requestsPerMinute={requestsPerMinute}
          timeRange={timeRange}
          dataRequestCost={dataRequestCost}
          showFullValue={true}
        />
      </div>
    </div>
  )
} 