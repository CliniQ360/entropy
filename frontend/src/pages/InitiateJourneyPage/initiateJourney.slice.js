import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../utils/request";
import { apis } from "../../utils/apis";

export const generateOTP = createAsyncThunk(
  "login/generateOTP",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.generateOTP}?mobile_number=${payload?.mobileNumber}`,
      payload
    );
    return response;
  }
);

export const loginUsingOtp = createAsyncThunk(
  "login/loginUsingOtp",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.loginUsingOtp}?otp=${payload.otp}&txn_id=${payload.txnId}`,
      payload
    );
    return response;
  }
);

// Create the login slice
const initiateJourney = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetLoginState: (state) => {
      // state.user = null;
      state.userRole = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateOTP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(generateOTP.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(generateOTP.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });

    builder.addCase(loginUsingOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUsingOtp.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(loginUsingOtp.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error.message;
    });
  },
});

export const { resetLoginState } = initiateJourney.actions;
export default initiateJourney.reducer;
