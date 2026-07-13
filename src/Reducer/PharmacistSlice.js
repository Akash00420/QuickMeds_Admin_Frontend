import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const initialState = {
  requests: [],
  total: 0,
  page: 1,
  selected: null,
  loading: false,
  actionLoading: false,
  error: null,
};

// GET /pharmacies?isVerified=false  (admin only)
// filterStatus: "pending" | "approved" | "all"
export const fetchPharmacistRequests = createAsyncThunk(
  "pharmacist/fetchRequests",
  async (filterStatus = "pending", { rejectWithValue }) => {
    try {
      const params = {};
      if (filterStatus === "pending") params.isVerified = "false";
      if (filterStatus === "approved") params.isVerified = "true";
      // "all" -> no isVerified param

      const res = await axiosInstance.get("/pharmacies", { params });
      return res.data.data; // { pharmacies, total, page }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch requests"
      );
    }
  }
);

// GET /pharmacies/:pharmacyId
export const fetchPharmacistById = createAsyncThunk(
  "pharmacist/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/pharmacies/${id}`);
      return res.data.data.pharmacy;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch request details"
      );
    }
  }
);

// PUT /pharmacies/:pharmacyId/verify  { approve: true }
export const approvePharmacist = createAsyncThunk(
  "pharmacist/approve",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/pharmacies/${id}/verify`, {
        approve: true,
      });
      return res.data.data.pharmacy;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Approval failed"
      );
    }
  }
);

// PUT /pharmacies/:pharmacyId/verify  { approve: false }  -> this is the reject
export const rejectPharmacist = createAsyncThunk(
  "pharmacist/reject",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/pharmacies/${id}/verify`, {
        approve: false,
      });
      return res.data.data.pharmacy;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Rejection failed"
      );
    }
  }
);

// PUT /pharmacies/:pharmacyId/deactivate  -> separate from reject; pulls an
// already-approved pharmacy offline
export const deactivatePharmacist = createAsyncThunk(
  "pharmacist/deactivate",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/pharmacies/${id}/deactivate`);
      return res.data.data.pharmacy;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Deactivation failed"
      );
    }
  }
);

const pharmacistSlice = createSlice({
  name: "pharmacist",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch list
      .addCase(fetchPharmacistRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacistRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload.pharmacies;
        state.total = action.payload.total;
        state.page = action.payload.page;
      })
      .addCase(fetchPharmacistRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetch single
      .addCase(fetchPharmacistById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPharmacistById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchPharmacistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // approve
      .addCase(approvePharmacist.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(approvePharmacist.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.requests = state.requests.filter(
          (r) => r._id !== action.payload._id
        );
        if (state.selected?._id === action.payload._id) {
          state.selected = action.payload;
        }
      })
      .addCase(approvePharmacist.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // reject
      .addCase(rejectPharmacist.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(rejectPharmacist.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.requests = state.requests.filter(
          (r) => r._id !== action.payload._id
        );
        if (state.selected?._id === action.payload._id) {
          state.selected = action.payload;
        }
      })
      .addCase(rejectPharmacist.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      // deactivate
      .addCase(deactivatePharmacist.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deactivatePharmacist.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.requests = state.requests.map((r) =>
          r._id === action.payload._id ? action.payload : r
        );
        if (state.selected?._id === action.payload._id) {
          state.selected = action.payload;
        }
      })
      .addCase(deactivatePharmacist.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelected } = pharmacistSlice.actions;
export default pharmacistSlice.reducer;