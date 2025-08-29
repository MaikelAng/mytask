import React from 'react'

interface SleepChartProps {
  dailyData: any[]
  loading: boolean
}

const SleepChart: React.FC<SleepChartProps> = ({ dailyData, loading }) => {
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!dailyData || dailyData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No sleep data available
      </div>
    )
  }

  const formatHMS = (seconds: number) => {
    if (!seconds || seconds <= 0) return '0h'
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    let parts: string[] = []
    if (h > 0) parts.push(`${h}h`)
    if (m > 0) parts.push(`${m}m`)
    return parts.join(' ')
  }

  const processedData = dailyData
    .map((d) => {
      const totalSec = Number(d.TotalTimeAsleep) || 0
      return {
        ...d,
        hours: totalSec / 3600,
        label: formatHMS(totalSec),
      }
    })
    .sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime())

  const maxDuration = Math.max(...processedData.map((d) => d.hours), 1)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Last 7 Days</h3>
        <span className="text-sm text-gray-500">Sleep duration</span>
      </div>

      <div className="space-y-2">
        {processedData.map((day, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="text-xs text-gray-600 w-12 mr-3 whitespace-nowrap">
              {day.Date}
            </span>

            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{
                  width: `${(day.hours / maxDuration) * 100}%`,
                }}
              ></div>
            </div>

            <span className="text-sm font-semibold w-16 text-right">
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SleepChart
