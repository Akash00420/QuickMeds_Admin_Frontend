import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const PharmacistRequestCard = ({ request }) => {
  const navigate = useNavigate();

  return (
    <div
      className="reservation-card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/pharmacist-requests/${request._id}`)}
    >
      <div className="reservation-header">
        <span className="reservation-id">#{request._id?.slice(-6)}</span>
        <StatusBadge status={request.status} />
      </div>
      <div className="reservation-user">{request.shopName}</div>
      <div className="reservation-items">
        {request.ownerName} • {request.email} • {request.phone}
      </div>
      <div className="reservation-footer">
        <span className="text-sm text-muted">
          Applied on {new Date(request.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default PharmacistRequestCard;