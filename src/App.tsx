import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from './components/store/store'
import UserList from './components/dashboard/UserList'
import UserDashboard from './components/dashboard/UserDashboard'
const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  return (
    <Provider store={store}>
      {' '}
      <div className="min-h-screen bg-gray-50">
        {' '}
        {!selectedUser ? (
          <UserList onSelectUser={setSelectedUser} />
        ) : (
          <UserDashboard
            user={selectedUser}
            onBack={() => setSelectedUser(null)}
          />
        )}{' '}
      </div>{' '}
    </Provider>
  )
}
export default App
