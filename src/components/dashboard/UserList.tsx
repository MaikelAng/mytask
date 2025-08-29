import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getUserList } from '../store/reducer/userReducer'
import { FaHeart, FaSpinner } from 'react-icons/fa'

interface User {
  ID: string
  LoginEmail: string
  UserName: string
  DeviceCompany: string
  DeviceUserID: string
}

interface UserListProps {
  onSelectUser: (user: User) => void
}

const UserList = ({ onSelectUser }: UserListProps) => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state: any) => state.users.user || [])
  const error = useAppSelector((state: any) => state.users.errorMessage)
  const loading = useAppSelector((state: any) => state.users.loader)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(getUserList())
  }, [dispatch])

  const filteredUsers = users.filter((user: User) => {
    const keyword = searchTerm.toLowerCase()
    return (
      user.UserName?.toLowerCase().includes(keyword) ||
      user.LoginEmail?.toLowerCase().includes(keyword)
    )
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-blue-500 text-4xl" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 my-6">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Health Monitoring Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a user to view their health statistics, sleep patterns, and
            wellness scores
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentUsers.length > 0 ? (
            currentUsers.map((user: User) => (
              <div
                key={user.ID}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-blue-100 hover:border-blue-300 flex flex-col"
                onClick={() => onSelectUser(user)}
              >
                <div className="h-24 bg-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaHeart className="h-16 w-16 text-white opacity-20" />
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white rounded-full p-1 shadow-md">
                    <div className="bg-green-400 rounded-full h-3 w-3"></div>
                  </div>
                </div>

                <div className="p-5 relative -mt-12 flex flex-col flex-1">
                  <div className="bg-white rounded-full p-1 shadow-lg h-16 w-16 mx-auto mb-3 border-2 border-blue-300">
                    <div className="bg-blue-100 text-blue-700 rounded-full h-full w-full flex items-center justify-center font-bold text-xl">
                      {user.UserName
                        ? user.UserName.charAt(0).toUpperCase()
                        : 'U'}
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800 truncate">
                      {user.UserName || 'Unknown User'}
                    </h2>
                    <p className="text-gray-600 text-sm truncate">
                      {user.LoginEmail}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-gray-500 font-medium">
                        Device Company
                      </span>
                      <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {user.DeviceCompany}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-medium">
                        User ID
                      </span>
                      <span
                        className="text-xs font-semibold text-gray-700 max-w-[120px] truncate"
                        title={user.DeviceUserID}
                      >
                        {user.DeviceUserID}
                      </span>
                    </div>
                  </div>

                  <button className="mt-auto w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                    View Health Data
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No users found.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === pageNumber
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="px-2">
                      ...
                    </span>
                  )
                }
                return null
              })}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Showing {filteredUsers.length === 0 ? 0 : indexOfFirstItem + 1} to{' '}
            {Math.min(indexOfLastItem, filteredUsers.length)} of{' '}
            {filteredUsers.length} users
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserList
