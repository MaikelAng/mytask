import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../utils/api'

export const getUserSleep = createAsyncThunk(
  'user/getUserSleep',
  async ({ loginEmail, deviceUserId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/api/getUserSleepData?LoginEmail=${loginEmail}&DeviceUserID=${deviceUserId}`
      )

      return response.data.data
    } catch (error) {
      console.log('Error di getUserSleep:', error)
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const userSleepReducer = createSlice({
  name: 'userSleep',
  initialState: {
    data: [],
    loader: false,
    errorMessage: '',
    successMessage: '',
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserSleep.pending, (state) => {
      state.loader = true
    })
    builder.addCase(getUserSleep.fulfilled, (state, action) => {
      state.loader = false
      state.data = action.payload
    })
    builder.addCase(getUserSleep.rejected, (state, action) => {
      state.loader = false
      state.errorMessage = action.payload
    })
  },
})

export const { messageClear } = userSleepReducer.actions
export default userSleepReducer.reducer
