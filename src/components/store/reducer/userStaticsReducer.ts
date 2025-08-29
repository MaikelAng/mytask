import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../../utils/api';

export const getUserStatics = createAsyncThunk(
  'user/getUserStatics',
  async ({ loginEmail, deviceUserId, date }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/getUserStatics?LoginEmail=${loginEmail}&DeviceUserID=${deviceUserId}&Date=${date}`);
      console.log('My User Statics:', response.data);
      return response.data.data;
    } catch (error) {
      console.log('Error:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userStaticsReducer = createSlice({
  name: 'userStatics',
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
    builder.addCase(getUserStatics.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getUserStatics.fulfilled, (state, action) => {
      state.loader = false;
      state.data = action.payload;
    });
    builder.addCase(getUserStatics.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload;
    });
  }
});

export const { messageClear } = userStaticsReducer.actions;
export default userStaticsReducer.reducer;
