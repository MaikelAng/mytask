import React from 'react'

interface ScoreGaugeProps {
  score: number
  loading: boolean
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, loading }) => {
  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const percentage = score ? (score / 100) * 100 : 0

  let gaugeColor = percentage > 50 ? 'blue' : 'red'

  return (
    <div className="text-center">
      <div className="relative mx-auto w-48 h-48">
        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${gaugeColor} ${
              percentage * 3.6
            }deg, transparent ${percentage * 3.6}deg)`,
          }}
        ></div>

        <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">
              {score || 'N/A'}
            </div>
            <div className="text-sm text-gray-500">out of 100</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600"></div>
      </div>
    </div>
  )
}

export default ScoreGauge
