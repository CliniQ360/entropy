import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../utils/apis";
import { apiRequest, BASE_URL } from "../../utils/request";

import axios from "axios";

export const creditStatusCheck = createAsyncThunk(
  "creditStatusCheck",
  async (payload) => {
    const response = await axios.get(
      `https://staging.cliniq360.com/${apis?.creditStatusCheck}?txn_id=${payload.txnId}`
    );
    return response.data;
  }
);

const transactionStatusSlice = createSlice({
  name: "transactionStatusSlice",
  initialState: {
    transactionStatus: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(creditStatusCheck.pending, (state) => {
        state.loading = true;
      })
      .addCase(creditStatusCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionStatus = action.payload;
      })
      .addCase(creditStatusCheck.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default transactionStatusSlice.reducer;
