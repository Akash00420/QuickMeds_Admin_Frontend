import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const initialState = {
  vendors: [],
  generatedPassword: null, // shown once after admin directly adds a vendor
  loading: false,
  actionLoading: false,
  error: null,
};

// GET /api/pharmacies/admin/vendors -> { success, message, data: { vendors } }
export const fetchVendors = createAsyncThunk(
  "vendor/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/pharmacies/admin/vendors");
      return res.data.data.vendors;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch vendors"
      );
    }
  }
);

// POST /api/pharmacies/admin/vendors -> { data: { vendor, generatedPassword } }
export const addVendorDirectly = createAsyncThunk(
  "vendor/addDirectly",
  async (vendorData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/pharmacies/admin/vendors", vendorData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add vendor"
      );
    }
  }
);

// PATCH /api/pharmacies/:pharmacyId/toggle-active -> { data: { pharmacy } }
export const toggleVendorStatus = createAsyncThunk(
  "vendor/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/pharmacies/${id}/toggle-active`);
      return { id, isActive: res.data?.data?.pharmacy?.isActive };
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
            ? { ...v, isActive: action.payload.isActive }
            : v
        );
      });
  },
});

export const { clearVendorGeneratedPassword } = vendorSlice.actions;
export default vendorSlice.reducer;