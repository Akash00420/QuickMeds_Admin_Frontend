import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PharmacistRequests from "./pages/PharmacistRequests";
import PharmacistDetail from "./pages/PharmacistDetail";
import VendorManagement from "./pages/VendorManagement";
import AddVendor from "./pages/AddVendor";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Everything below requires the admin to be logged in */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pharmacist-requests" element={<PharmacistRequests />} />
          <Route path="/pharmacist-requests/:id" element={<PharmacistDetail />} />
          <Route path="/vendors" element={<VendorManagement />} />
          <Route path="/vendors/add" element={<AddVendor />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;