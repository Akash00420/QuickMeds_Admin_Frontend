import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPharmacistRequests } from "../store/Reducer/PharmacistSlice";
import { fetchVendors } from "../store/Reducer/VendorSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((s) => s.auth);
  const { requests } = useSelector((s) => s.pharmacist);
  const { vendors } = useSelector((s) => s.vendor);

  useEffect(() => {
    dispatch(fetchPharmacistRequests("pending"));
    dispatch(fetchVendors());
  }, [dispatch]);

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const activeVendorCount = vendors.filter((v) => v.status !== "suspended").length;

  return (
    <div>
      <div className="dashboard-greeting">
        <h1>
          Welcome back, <span>{admin?.name || "Admin"}</span>
        </h1>
        <p className="page-subtitle">Here's what's happening today</p>
      </div>

      <div className="stat-grid">
        <div
          className="stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/pharmacist-requests")}
        >
          <div className="stat-icon icon-amber">📝</div>
          <div className="stat-label">Pending Requests</div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-sub">Awaiting your review</div>
        </div>

        <div
          className="stat-card"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/vendors")}
        >
          <div className="stat-icon icon-teal">🏪</div>
          <div className="stat-label">Active Vendors</div>
          <div className="stat-value">{activeVendorCount}</div>
          <div className="stat-sub">Currently on the platform</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon icon-blue">📦</div>
          <div className="stat-label">Total Vendors</div>
          <div className="stat-value">{vendors.length}</div>
          <div className="stat-sub">Including suspended</div>
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <span className="section-title">Quick Actions</span>
        </div>
        <div className="flex gap-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/pharmacist-requests")}
          >
            Review Requests
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/vendors/add")}
          >
            Add Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;