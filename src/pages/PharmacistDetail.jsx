import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchPharmacistById,
  approvePharmacist,
  rejectPharmacist,
  clearGeneratedPassword,
  clearSelected,
} from "../store/Reducer/PharmacistSlice";
import StatusBadge from "../components/StatusBadge";
import ApproveModal from "../components/ApproveModal";
import RejectModal from "../components/RejectModal";

const PharmacistDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selected, generatedPassword, loading, actionLoading } = useSelector(
    (s) => s.pharmacist
  );

  const [showReject, setShowReject] = useState(false);

  useEffect(() => {
    dispatch(fetchPharmacistById(id));
    return () => dispatch(clearSelected());
  }, [dispatch, id]);

  const handleApprove = () => {
    dispatch(approvePharmacist(id));
  };

  const handleReject = (reason) => {
    dispatch(rejectPharmacist({ id, reason })).then(() => setShowReject(false));
  };

  if (loading || !selected) {
    return (
      <div className="loader-wrap">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/pharmacist-requests" className="text-sm text-teal">
            ← Back to requests
          </Link>
          <div className="page-title mt-2">{selected.shopName}</div>
        </div>
        <StatusBadge status={selected.status} />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-header">
            <span className="section-title">Shop Information</span>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="stat-label">Owner Name</div>
              <div>{selected.ownerName}</div>
            </div>
            <div>
              <div className="stat-label">Email</div>
              <div>{selected.email}</div>
            </div>
            <div>
              <div className="stat-label">Phone</div>
              <div>{selected.phone}</div>
            </div>
            <div>
              <div className="stat-label">Address</div>
              <div>{selected.address}</div>
            </div>
            <div>
              <div className="stat-label">License Number</div>
              <div>{selected.license}</div>
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
          {selected.documents?.length ? (
            <div className="flex flex-col gap-2">
              {selected.documents.map((doc, i) => (
                
                  key={i}
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline btn-sm w-full"
                >
                  {doc.name || `Document ${i + 1}`}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">No documents uploaded</p>
          )}
        </div>
      </div>

      {selected.status === "pending" && (
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
              {actionLoading ? (
                <span className="loader loader-sm" />
              ) : (
                "Approve"
              )}
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

      {generatedPassword && (
        <ApproveModal
          password={generatedPassword}
          shopName={selected.shopName}
          onClose={() => {
            dispatch(clearGeneratedPassword());
            navigate("/pharmacist-requests");
          }}
        />
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