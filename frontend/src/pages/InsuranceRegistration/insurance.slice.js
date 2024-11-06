import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../utils/request";
import { apis } from "../../utils/apis";

export const submitInsuranceForm = createAsyncThunk(
  "submitInsuranceForm",
  async (payload) => {
    if (payload?.offerId) {
      const response = await apiRequest(
        "POST",
        `${apis?.submitInsuranceForm}?txn_id=${payload.txnId}&offer_item_id=${payload.offerId}`,
        payload?.formData
      );
      return response;
    } else {
      const response = await apiRequest(
        "POST",
        `${apis?.submitInsuranceForm}?txn_id=${payload.txnId}`,
        payload.formData
      );
      return response;
    }
  }
);

export const insuranceConfirm = createAsyncThunk(
  "insuranceConfirm",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.insuranceConfirm}?txn_id=${payload.txnId}&offer_item_id=${payload.offerId}`
    );
    return response;
  }
);

export const insuranceSearch = createAsyncThunk(
  "searchInsurance",
  async (payload) => {
    if (payload?.txnId) {
      const response = await apiRequest(
        "POST",
        `${apis?.insuranceSearch}?environment=${payload?.environment}&txn_id=${payload?.txnId}`
      );
      return response;
    } else {
      const response = await apiRequest(
        "POST",
        `${apis?.insuranceSearch}?environment=${payload.environment}&user_id=${payload.user_id}`
      );
      return response;
    }
  }
);

export const insuranceOfferDetails = createAsyncThunk(
  "insuranceOffers",
  async (payload) => {
    // if(payload?.offerId){
    //   const response = await apiRequest("GET", `${apis?.insuranceOfferDetails}?txn_id=${payload.txnId}&offer_item_id=${payload.offerId}`);
    //   return response;
    // } else {
    const response = await apiRequest(
      "GET",
      `${apis?.insuranceOfferDetails}?txn_id=${payload.txnId}`
    );
    return response;
    // }
  }
);

export const insuranceSelect = createAsyncThunk(
  "insuranceSelect",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.insuranceSelect}?txn_id=${payload.txnId}&offer_item_id=${payload.offerId}`,
      payload.addOnData
    );
    return response;
  }
);

export const insuranceFormUrl = createAsyncThunk(
  "insuranceFormUrl",
  async (payload) => {
    const response = await apiRequest(
      "GET",
      `${apis?.insuranceFormUrl}?txn_id=${payload.txnId}&offer_item_id=${payload.offerId}&form_type=${payload.formType}`
    );
    return response;
  }
);

export const insuranceInit = createAsyncThunk(
  "insuranceInit",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.insuranceInit}?txn_id=${payload.txnId}&offer_item_id=${payload.offerId}`
    );
    return response;
  }
);

export const insuranceCancel = createAsyncThunk(
  "insuranceCancel",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.insuranceCancel}?txn_id=${payload.txnId}&offer_item_id=${payload.offerId}&cancellation_reason_id=${payload.cancellationId}&cancellation_notes=${payload.note}`
    );
    return response;
  }
);

export const insuranceStatus = createAsyncThunk(
  "insuranceStatus",
  async (payload) => {
    const response = await apiRequest(
      "POST",
      `${apis?.insuranceStatus}?txn_id=${payload.txnId}&offer_item_id=${payload.offerId}`
    );
    return response;
  }
);

export const insuranceTC = createAsyncThunk("insuranceTC", async (payload) => {
  const response = await apiRequest(
    "GET",
    `${apis?.insuranceTC}?order_id=${payload.orderId}`
  );
  return response;
});

const InsuranceSlice = createSlice({
  name: "SubmitInsurance",
  initialState: {
    creditList: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetSearchData: (state, value) => {
      state.insuranceList = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitInsuranceForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitInsuranceForm.fulfilled, (state, action) => {
        state.loading = false;
        state.creditList = action.payload;
      })
      .addCase(submitInsuranceForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default InsuranceSlice.reducer;
