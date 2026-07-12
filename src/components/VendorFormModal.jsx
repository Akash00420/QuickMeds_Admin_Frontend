import { useState } from "react";

const initialForm = {
  shopName: "",
  ownerName: "",
  email: "",
  phone: "",
  address: "",
  license: "",
};

const VendorFormModal = ({ onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.shopName || !form.ownerName || !form.email || !form.phone) return;
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add Vendor Directly</span>
          <button className="modal-close" onClick={onCancel}>
            ×
          </button>
        </div>

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
              className="form-input"
              type="email"
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
            <label className="form-label">Address</label>
            <input
              className="form-input"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="form-label">License Number</label>
            <input
              className="form-input"
              name="license"
              value={form.license}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <span className="loader loader-sm" /> : "Create Vendor"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorFormModal;