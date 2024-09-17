import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../utils/request";
import { apis } from "../../../utils/apis";
import axios from "axios";

export const contactUs = createAsyncThunk("contactUs", async (payload) => {
  // const res = await axios.post(`${apis.contactUs}?lead_category=${payload.lead_category}`, payload, )
  const response = await apiRequest(
    "POST",
    `${apis.contactUs}?lead_category=${payload.lead_category}`,
    payload
  );
  return response;
});

const landingPageSlice = createSlice({
  name: "contactUser",
  initialState: {
    loading: false,
    error: null,
    contactUs: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contactUs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contactUs.fulfilled, (state, action) => {
        state.loading = false;
        state.contactUs = action.payload;
      })
      .addCase(contactUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default landingPageSlice.reducer;
