const RejectModal = ({ loading, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-title">Reject this pharmacy?</div>
        <p className="text-sm text-muted">
          This will mark the pharmacy as unverified. The owner can re-upload
          documents and be reviewed again.
        </p>
        <div className="flex gap-3 mt-4">
          <button className="btn btn-outline" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? <span className="loader loader-sm" /> : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;