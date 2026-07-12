const ApproveModal = ({ password, shopName, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Pharmacist Approved 🎉</span>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <p className="text-sm mb-4">
          <strong>{shopName}</strong> has been approved. Share the temporary
          password below with the pharmacist — they'll be required to change
          it after their first login.
        </p>

        <div className="stock-modal-current">
          <span className="stock-modal-label">Temporary Password</span>
          <span className="stock-modal-value" style={{ fontFamily: "monospace" }}>
            {password}
          </span>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline" onClick={handleCopy}>
            Copy Password
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;