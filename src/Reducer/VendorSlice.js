import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const initialState = {
  vendors: [],
  generatedPassword: null, // shown once after admin directly adds a vendor
  loading: false,
  actionLoading: false,
  error: null,
};

// GET /admin/vendors
export const fetchVendors = createAsyncThunk(
  "vendor/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/admin/vendors");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch vendors"
      );
    }
  }
);

// POST /admin/vendors  { shopName, ownerName, email, phone, address, license }
// -> { vendor, generatedPassword }
export const addVendorDirectly = createAsyncThunk(
  "vendor/addDirectly",
  async (vendorData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/admin/vendors", vendorData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add vendor"
      );
    }
  }
);

// PATCH /admin/vendors/:id/status
export const toggleVendorStatus = createAsyncThunk(
  "vendor/toggleStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/admin/vendors/${id}/status`, { status });
      return { id, status };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update vendor status"
      );
    }
  }
);

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    clearVendorGeneratedPassword: (state) => {
      state.generatedPassword = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addVendorDirectly.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(addVendorDirectly.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.vendors.unshift(action.payload.vendor);
        state.generatedPassword = action.payload.generatedPassword;
      })
      .addCase(addVendorDirectly.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleVendorStatus.fulfilled, (state, action) => {
        state.vendors = state.vendors.map((v) =>
          v._id === action.payload.id
            ? { ...v, status: action.payload.status }
            : v
        );
      });
  },
});

export const { clearVendorGeneratedPassword } = vendorSlice.actions;
export default vendorSlice.reducer;