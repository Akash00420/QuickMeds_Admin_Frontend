import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin, clearError } from "../store/Reducer/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
    return () => dispatch(clearError());
  }, [isAuthenticated]);

  const handleSubmit = () => {
    if (!form.email || !form.password) return;
    dispatch(loginAdmin(form));
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-mark">Q</div>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#1D9E75" }}>
            QuickMeds Admin
          </span>
        </div>

        <h1 className="auth-title">Admin Login</h1>
        <p className="auth-sub">Manage pharmacist approvals and vendors</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-input"
            placeholder="admin@quickmeds.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyDown={handleKey}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={handleKey}
          />
        </div>

        <button
          className="btn btn-primary w-full"
          onClick={handleSubmit}
          disabled={loading || !form.email || !form.password}
          style={{ justifyContent: "center", marginTop: 4 }}
        >
          {loading ? <span className="loader loader-sm" /> : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Login;