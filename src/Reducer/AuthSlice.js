import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const storedAdmin = localStorage.getItem("adminInfo");

let parsedAdmin = null;
try {
  parsedAdmin = storedAdmin ? JSON.parse(storedAdmin) : null;
} catch {
  parsedAdmin = null;
  localStorage.removeItem("adminInfo"); // clean up corrupted value
}

const initialState = {
  admin: parsedAdmin,
  isAuthenticated: !!localStorage.getItem("adminToken"),
  loading: false,
  error: null,
};

// POST /admin/login  -> { token, admin: { id, name, email } }
export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/admin/login", credentials);

      localStorage.setItem("adminToken", res.data.token);

      if (res.data.admin) {
        localStorage.setItem("adminInfo", JSON.stringify(res.data.admin));
      } else {
        localStorage.removeItem("adminInfo");
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
      state.admin = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload.admin ?? null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin, clearError } = authSlice.actions;
export default authSlice.reducer;