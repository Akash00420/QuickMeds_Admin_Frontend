import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const initialState = {
  requests: [],       // pharmacists with status: pending / approved / rejected
  selected: null,      // currently viewed request (PharmacistDetail page)
  generatedPassword: null, // shown once right after approval
  loading: false,
  actionLoading: false,
  error: null,
};

// GET /admin/pharmacist-requests?status=pending
export const fetchPharmacistRequests = createAsyncThunk(
  "pharmacist/fetchRequests",
  async (status = "pending", { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/pharmacist-requests", {
        params: { status },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch requests"
      );
    }
  }
);

// GET /admin/pharmacist-requests/:id
export const fetchPharmacistById = createAsyncThunk(
  "pharmacist/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/admin/pharmacist-requests/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch request details"
      );
    }
  }
);

// POST /admin/pharmacist-requests/:id/approve  -> { generatedPassword }
export const approvePharmacist = createAsyncThunk(
  "pharmacist/approve",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        `/admin/pharmacist-requests/${id}/approve`
      );
      return { id, generatedPassword: res.data.generatedPassword };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Approval failed"
      );
    }
  }
);

// POST /admin/pharmacist-requests/:id/reject  { reason }
export const rejectPharmacist = createAsyncThunk(
  "pharmacist/reject",
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(`/admin/pharmacist-requests/${id}/reject`, {
        reason,
      });
      return { id };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Rejection failed"
      );
    }
  }
);

const pharmacistSlice = createSlice({
  name: "pharmacist",
  initialState,
  reducers: {
    clearGeneratedPassword: (state) => {
      state.generatedPassword = null;
    },
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
        state.requests = action.payload;
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
        state.generatedPassword = action.payload.generatedPassword;
        state.requests = state.requests.map((r) =>
          r._id === action.payload.id ? { ...r, status: "approved" } : r
        );
        if (state.selected) state.selected.status = "approved";
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
        state.requests = state.requests.map((r) =>
          r._id === action.payload.id ? { ...r, status: "rejected" } : r
        );
        if (state.selected) state.selected.status = "rejected";
      })
      .addCase(rejectPharmacist.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGeneratedPassword, clearSelected } =
  pharmacistSlice.actions;
export default pharmacistSlice.reducer;