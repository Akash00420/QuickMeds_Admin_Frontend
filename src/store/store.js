import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Reducer/AuthSlice";
import pharmacistReducer from "./Reducer/PharmacistSlice";
import vendorReducer from "./Reducer/VendorSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    pharmacist: pharmacistReducer,
    vendor: vendorReducer,
  },
});

export default store;