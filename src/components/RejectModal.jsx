import { useState } from "react";

const RejectModal = ({ onConfirm, onCancel, loading }) => {
  const [reason, setReason] = useState("");

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Reject Application</span>
          <button className="modal-close" onClick={onCancel}>
            ×
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Reason for rejection</label>
          <textarea
            className="form-input"
            rows={4}
            placeholder="e.g. Incomplete license documents"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onConfirm(reason)}
            disabled={loading || !reason.trim()}
          >
            {loading ? <span className="loader loader-sm" /> : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;