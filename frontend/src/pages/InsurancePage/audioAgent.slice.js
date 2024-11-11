import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apis } from "../../utils/apis";
import { apiRequest, BASE_URL } from "../../utils/request";

import axios from "axios";

export const agentConversationForInsurance = createAsyncThunk(
  "agentConversation",
  async (payload) => {
    try {
      const response = await axios.post(
        BASE_URL +
          `/${apis?.agentAudioForInsurance}?` +
          `thread_id=${payload?.threadId}&state=${payload?.state}&translate=false&document_upload_flag=${payload?.uploadFlag}&offer_item_id=${payload?.offer_item_id}&language=${payload?.language}&selected_add_ons=${payload.selected_add_ons}`,
        payload?.file,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);
export const documentUploadForInsurance = createAsyncThunk(
  "agentConversation",
  async (payload) => {
    try {
      const response = await axios.post(
        BASE_URL +
          `/${apis?.documentUploadForInsurance}?` +
          `thread_id=${payload?.threadId}`,
        payload?.files,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const startConversionforInsurance = createAsyncThunk(
  "startConversion",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.initiateJourney}?language=${payload?.language}`
    );
    return response;
  }
);

export const bankLoanDataResumeConversion = createAsyncThunk(
  "startConversion",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.bankLoanDataApi}?language=${payload?.language}`,
      payload
    );
    return response;
  }
);

const audioAgentSlice = createSlice({
  name: "SearchVitals",
  initialState: {
    audioResponse: {},
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(agentConversation.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(agentConversation.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.audioResponse = action.payload;
  //     })
  //     .addCase(agentConversation.rejected, (state, action) => {
  //       state.loading = false;
  //     });
  // },
});

export default audioAgentSlice.reducer;
