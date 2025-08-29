import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../../utils/api';

export const getUserList = createAsyncThunk(
  'user/getUserList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/getUserList');
      console.log('My User List:', response.data); 
      return response.data.data;
    } catch (error) {
      console.log('Error:', error); 
      return rejectWithValue(error.response.data);
    }
  }
);


export const userReducer = createSlice({
  name: 'users',
  initialState: {
    user: [],
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
    builder.addCase(getUserList.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.loader = false;
      state.user = action.payload;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload;
    });
  }
});

export const { messageClear } = userReducer.actions;
export default userReducer.reducer;
