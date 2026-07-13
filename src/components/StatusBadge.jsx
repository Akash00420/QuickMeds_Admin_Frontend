const config = {
  pending: { label: "Pending", className: "badge badge-amber" },
  approved: { label: "Approved", className: "badge badge-green" },
};

const StatusBadge = ({ status }) => {
  const { label, className } = config[status] || config.pending;
  return <span className={className}>{label}</span>;
};

export default StatusBadge;