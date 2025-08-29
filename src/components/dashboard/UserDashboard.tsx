import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getUserSleep } from '../store/reducer/userSleepReducer'
import { getUserScore } from '../store/reducer/userScoreReducer'
import { getUserStatics } from '../store/reducer/userStaticsReducer'
import ScoreGauge from '../charts/ScoreGauge'
import StatisticCard from '../charts/StatisticCard'
import StatCard from '../common/StatCard'
import SleepChart from '../charts/SleepChart'
import StatisticTimeline from '../charts/StatisticTimeline'
import {
  FaCalendarAlt,
  FaMoon,
  FaClock,
  FaBed,
  FaArrowLeft,
  FaUser,
  FaChartBar,
} from 'react-icons/fa'

interface UserDashboardProps {
  user: any
  onBack: () => void
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onBack }) => {
  const dispatch = useAppDispatch()

  const { data: sleepDataRaw, loader: sleepLoading } = useAppSelector(
    (state) => state.userSleep
  )
  const { data: scoreDataRaw, loader: scoreLoading } = useAppSelector(
    (state) => state.userScore
  )
  const { data: statsData, loader: statsLoading } = useAppSelector(
    (state) => state.userStatics
  )

  const sleepData = Array.isArray(sleepDataRaw)
    ? sleepDataRaw[0]
    : sleepDataRaw || null

  const sleep7Days =
    Array.isArray(sleepDataRaw) && sleepDataRaw.length > 0
      ? [...sleepDataRaw]
          .sort(
            (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
          )
          .slice(-7)
      : []

  const scoreData =
    Array.isArray(scoreDataRaw) && scoreDataRaw.length > 0
      ? scoreDataRaw.reduce((latest, current) =>
          new Date(current.Date) > new Date(latest.Date) ? current : latest
        )
      : null

  const latestStats =
    Array.isArray(statsData) && statsData.length > 0
      ? statsData[statsData.length - 1]
      : null

  useEffect(() => {
    if (user?.LoginEmail && user?.DeviceUserID) {
      dispatch(
        getUserSleep({
          loginEmail: user.LoginEmail,
          deviceUserId: user.DeviceUserID,
        })
      )
      dispatch(
        getUserScore({
          loginEmail: user.LoginEmail,
          deviceUserId: user.DeviceUserID,
        })
      )
    }
  }, [user, dispatch])

  useEffect(() => {
    if (sleepData?.LoginEmail && sleepData?.DeviceUserID && sleepData?.Date) {
      dispatch(
        getUserStatics({
          loginEmail: sleepData.LoginEmail,
          deviceUserId: sleepData.DeviceUserID,
          date: sleepData.Date,
        })
      )
    }
  }, [dispatch, sleepData])

  const isLoading = sleepLoading || scoreLoading || statsLoading

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const formatHMS = (value?: number | string) => {
    if (!value) return 'N/A'
    let total = Number(value)
    if (total < 1000) total = total * 60
    const h = Math.floor(total / 3600)
    const m = Math.floor((total % 3600) / 60)
    const s = Math.floor(total % 60)
    let parts: string[] = []
    if (h > 0) parts.push(`${h} Hour${h > 1 ? 's' : ''}`)
    if (m > 0) parts.push(`${m} Min`)
    if (s > 0) parts.push(`${s} Sec`)
    return parts.join(' ')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <FaArrowLeft className="text-gray-600" /> Back
            </button>
            <div>
              <h1 className="sm:text-2xl lg:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FaUser className="text-blue-600" />
                {user.UserName}'s Health Dashboard Details
              </h1>
              <p className=" sm:text-xl lg:text-3xl text-gray-600 flex items-center gap-2">
                <FaChartBar className="text-gray-500" />
                Comprehensive health and Sleep analysis
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Sleep Date"
            value={sleepData?.Date || 'N/A'}
            icon={<FaCalendarAlt className="text-blue-500 text-xl" />}
          />
          <StatCard
            title="Sleep Onset"
            value={
              sleepData?.SleepOnset
                ? new Date(sleepData.SleepOnset).toLocaleTimeString()
                : 'N/A'
            }
            icon={<FaMoon className="text-indigo-500 text-xl" />}
          />
          <StatCard
            title="Wake Up Time"
            value={
              sleepData?.WakeUpTime
                ? new Date(sleepData.WakeUpTime).toLocaleTimeString()
                : 'N/A'
            }
            icon={<FaClock className="text-green-500 text-xl" />}
          />
          <StatCard
            title="Total Time Asleep"
            value={formatHMS(sleepData?.TotalTimeAsleep)}
            icon={<FaBed className="text-purple-500 text-xl" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-6 flex flex-col">
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col min-h-[420px]">
              <div className="flex items-center gap-2 mb-4 min-h-[44px]">
                <FaMoon className="text-indigo-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Sleep Data
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Awake</p>
                  <p className="text-xl font-bold text-gray-800">
                    {sleepData?.Awake || 0} min
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Light</p>
                  <p className="text-xl font-bold text-gray-800">
                    {sleepData?.Light || 0} %
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Deep</p>
                  <p className="text-xl font-bold text-gray-800">
                    {sleepData?.Deep || 0} %
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <SleepChart dailyData={sleep7Days} loading={sleepLoading} />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-full min-h-[360px]">
              <div className="flex items-center gap-2 mb-4 min-h-[44px]">
                <FaChartBar className="text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  User Statistics
                </h2>
              </div>
              {latestStats ? (
                <StatisticCard data={latestStats} loading={statsLoading} />
              ) : (
                <p className="text-gray-500">No statistics available</p>
              )}
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col min-h-[420px]">
              <div className="flex items-center gap-2 mb-4 min-h-[44px]">
                <FaChartBar className="text-green-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Vitalz Score
                </h2>
              </div>
              <div>
                <ScoreGauge
                  score={Number(scoreData?.VitalzScore) || 0}
                  loading={scoreLoading}
                />
              </div>
              <div className="mt-6">
                {scoreData?.ScoreType ? (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <FaChartBar /> Score Type
                    </h3>
                    <p className="text-blue-700">{scoreData.ScoreType}</p>
                  </div>
                ) : (
                  <div className="p-4 bg-transparent rounded-lg opacity-0 pointer-events-none">
                    <div className="h-10" />
                  </div>
                )}
              </div>
              <div className="flex-1" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-full min-h-[360px]">
              <div className="flex items-center gap-2 mb-4 min-h-[44px]">
                <FaChartBar className="text-purple-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Last 7 Statistic Times
                </h2>
              </div>
              <StatisticTimeline stats={statsData} loading={statsLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
