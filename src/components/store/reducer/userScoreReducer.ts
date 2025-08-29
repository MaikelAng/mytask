import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../../utils/api';

export const getUserScore = createAsyncThunk(
  'user/getUserScore',
  async ({ loginEmail, deviceUserId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/getUserScore?LoginEmail=${loginEmail}&DeviceUserID=${deviceUserId}`);
      console.log('My User Score:', response.data);
      return response.data.data;
    } catch (error) {
      console.log('Error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);


export const userScoreReducer = createSlice({
  name: 'userScore',
  initialState: {
    data: [],
    loader: false,
    errorMessage: '',
    successMessage: '',
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserScore.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getUserScore.fulfilled, (state, action) => {
      state.loader = false;
      state.data = action.payload;
    });
    builder.addCase(getUserScore.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload;
    });
  }
});

export const { messageClear } = userScoreReducer.actions;
export default userScoreReducer.reducer;
