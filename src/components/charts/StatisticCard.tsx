import React from 'react'
import { FaHeart, FaClock } from 'react-icons/fa'
import { FaWaveSquare } from 'react-icons/fa'
import { GiLungs } from 'react-icons/gi'

interface StatisticCardProps {
  data: any
  loading: boolean
}

const StatisticCard: React.FC<StatisticCardProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center text-gray-500 py-8">
        No statistics data available
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {data.HR && (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FaHeart className="text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="font-semibold text-gray-800">{data.HR} bpm</p>
            </div>
          </div>
        </div>
      )}
      {data.HRV && (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FaWaveSquare className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">HRV</p>
              <p className="font-semibold text-gray-800">{data.HRV}</p>
            </div>
          </div>
        </div>
      )}
      {data.OxygenSaturation && (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GiLungs className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Oxygen Saturation</p>
              <p className="font-semibold text-gray-800">
                {data.OxygenSaturation}%
              </p>
            </div>
          </div>
        </div>
      )}
      {data.Time && (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FaClock className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Measurement Time</p>
              <p className="font-semibold text-gray-800">{data.Time}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StatisticCard
