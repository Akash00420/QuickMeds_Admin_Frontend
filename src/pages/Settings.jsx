import { useSelector } from "react-redux";

const Settings = () => {
  const { admin } = useSelector((s) => s.auth);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Settings</div>
          <div className="page-subtitle">Your admin account details</div>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className="form-input" value={admin?.name || ""} disabled />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" value={admin?.email || ""} disabled />
        </div>
        <p className="text-sm text-muted">
          Contact a superadmin to update your account details.
        </p>
      </div>
    </div>
  );
};

export default Settings;