const statusMap = {
  pending: { label: "Pending", cls: "badge-amber" },
  approved: { label: "Approved", cls: "badge-green" },
  rejected: { label: "Rejected", cls: "badge-red" },
  active: { label: "Active", cls: "badge-green" },
  suspended: { label: "Suspended", cls: "badge-red" },
};

const StatusBadge = ({ status }) => {
  const conf = statusMap[status] || { label: status, cls: "badge-gray" };
  return <span className={`badge ${conf.cls}`}>{conf.label}</span>;
};

export default StatusBadge;