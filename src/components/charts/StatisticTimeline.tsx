import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { FaWaveSquare } from 'react-icons/fa'
import { GiLungs } from 'react-icons/gi'

interface StatisticTimelineProps {
  stats: any[]
  loading: boolean
}

const StatisticTimeline: React.FC<StatisticTimelineProps> = ({
  stats,
  loading,
}) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (!stats || stats.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No statistic data available
      </div>
    )
  }

  const last7 = stats.slice(-7).reverse()

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2 bg-gray-100 p-2 rounded-md text-xs font-semibold text-gray-700">
        <div>Measuring Time</div>
        <div className="flex items-center space-x-1">
          <FaHeart className="text-red-500" />
          <span>Heart Rate</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaWaveSquare className="text-purple-500" />
          <span>HRV</span>
        </div>
        <div className="flex items-center space-x-1">
          <GiLungs className="text-blue-500" />
          <span>Oxygen Saturation</span>
        </div>
      </div>

      {last7.map((item, idx) => (
        <div
          key={idx}
          className="grid grid-cols-4 gap-2 bg-white p-2 rounded-lg shadow-sm text-sm text-gray-800"
        >
          <div className="font-medium">{item.Time}</div>
          <div>{item.HR} bpm</div>
          <div>{item.HRV}</div>
          <div>{item.OxygenSaturation}%</div>
        </div>
      ))}
    </div>
  )
}

export default StatisticTimeline
