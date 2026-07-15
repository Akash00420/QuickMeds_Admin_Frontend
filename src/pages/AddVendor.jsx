import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addVendorDirectly,
  clearVendorGeneratedPassword,
} from "../Reducer/VendorSlice";
import ApproveModal from "../components/ApproveModal";

const initialForm = {
  shopName: "",
  ownerName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  latitude: "",
  longitude: "",
  registrationNumber: "",
};

const AddVendor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actionLoading, generatedPassword, error } = useSelector(
    (s) => s.vendor
  );
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (
      !form.shopName ||
      !form.ownerName ||
      !form.email ||
      !form.phone ||
      !form.street ||
      !form.city ||
      !form.state ||
      !form.pincode ||
      !form.latitude ||
      !form.longitude ||
      !form.registrationNumber
    )
      return;

    dispatch(
      addVendorDirectly({
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      })
    );
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Add Vendor</div>
          <div className="page-subtitle">
            Create a vendor account directly, no approval flow needed
          </div>
        </div>
      </div>

      <div className="card card-lg" style={{ maxWidth: 640 }}>
        {error && <div className="auth-error">{error}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Shop Name</label>
            <input
              className="form-input"
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Owner Name</label>
            <input
              className="form-input"
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="form-label">Street</label>
            <input
              className="form-input"
              name="street"
              value={form.street}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              className="form-input"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">State</label>
            <input
              className="form-input"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Pincode</label>
            <input
              className="form-input"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Latitude</label>
            <input
              className="form-input"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Longitude</label>
            <input
              className="form-input"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="form-label">Registration Number</label>
            <input
              className="form-input"
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={actionLoading}
        >
          {actionLoading ? <span className="loader loader-sm" /> : "Create Vendor"}
        </button>
      </div>

      {generatedPassword && (
        <ApproveModal
          password={generatedPassword}
          shopName={form.shopName}
          onClose={() => {
            dispatch(clearVendorGeneratedPassword());
            navigate("/vendors");
          }}
        />
      )}
    </div>
  );
};

export default AddVendor;