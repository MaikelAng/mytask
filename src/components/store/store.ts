import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/userReducer'
import userSleepReducer from './reducer/userSleepReducer'
import userScoreReducer from './reducer/userScoreReducer'
import userStaticsReducer from './reducer/userStaticsReducer'

export const store = configureStore({
  reducer: {
    users: userReducer,
    userSleep: userSleepReducer,
    userScore: userScoreReducer,
    userStatics: userStaticsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
