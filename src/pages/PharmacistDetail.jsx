import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchPharmacistById,
  approvePharmacist,
  rejectPharmacist,
  clearSelected,
} from "../Reducer/PharmacistSlice";
import StatusBadge from "../components/StatusBadge";
import RejectModal from "../components/RejectModal";

const PharmacistDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selected, loading, actionLoading } = useSelector((s) => s.pharmacist);

  const [showReject, setShowReject] = useState(false);

  useEffect(() => {
    dispatch(fetchPharmacistById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  const handleApprove = () => {
    dispatch(approvePharmacist(id)).then(() => navigate("/pharmacist-requests"));
  };

  const handleReject = () => {
    dispatch(rejectPharmacist(id)).then(() => {
      setShowReject(false);
      navigate("/pharmacist-requests");
    });
  };

  if (loading || !selected) {
    return (
      <div className="loader-wrap">
        <div className="loader" />
      </div>
    );
  }

  const { street, city, state, pincode } = selected.address || {};
  const fullAddress = [street, city, state, pincode].filter(Boolean).join(", ");

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/pharmacist-requests" className="text-sm text-teal">
            ← Back to requests
          </Link>
          <div className="page-title mt-2">{selected.name}</div>
        </div>
        <StatusBadge status={selected.isVerified ? "approved" : "pending"} />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-header">
            <span className="section-title">Shop Information</span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="stat-label">Owner Name</div>
              <div>{selected.owner?.name}</div>
            </div>
            <div>
              <div className="stat-label">Email</div>
              <div>{selected.email || selected.owner?.email}</div>
            </div>
            <div>
              <div className="stat-label">Phone</div>
              <div>{selected.phone}</div>
            </div>
            <div>
              <div className="stat-label">Address</div>
              <div>{fullAddress}</div>
            </div>
            <div>
              <div className="stat-label">Registration Number</div>
              <div>{selected.registrationNumber}</div>
            </div>
            <div>
              <div className="stat-label">Applied On</div>
              <div>{new Date(selected.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-header">
            <span className="section-title">Documents</span>
          </div>
          {selected.licenseDocument?.url ? (
            <a
              href={selected.licenseDocument.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline btn-sm w-full"
            >
              License Document
            </a>
          ) : (
            <p className="text-sm text-muted">No documents uploaded</p>
          )}
        </div>
      </div>

      {!selected.isVerified && (
        <div className="card mt-6">
          <div className="section-header">
            <span className="section-title">Take Action</span>
          </div>
          <div className="flex gap-3">
            <button
              className="btn btn-primary"
              onClick={handleApprove}
              disabled={actionLoading}
            >
              {actionLoading ? <span className="loader loader-sm" /> : "Approve"}
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setShowReject(true)}
              disabled={actionLoading}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {showReject && (
        <RejectModal
          loading={actionLoading}
          onCancel={() => setShowReject(false)}
          onConfirm={handleReject}
        />
      )}
    </div>
  );
};

export default PharmacistDetail;