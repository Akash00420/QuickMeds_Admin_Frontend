import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const PharmacistRequestCard = ({ request }) => {
  const { street, city, state, pincode } = request.address || {};
  const fullAddress = [street, city, state, pincode].filter(Boolean).join(", ");

  return (
    <Link to={`/pharmacist-requests/${request._id}`} className="card request-card">
      <div className="flex justify-between items-start">
        <div>
          <div className="request-card-title">{request.name}</div>
          <div className="text-sm text-muted">{request.owner?.name}</div>
        </div>
        <StatusBadge status={request.isVerified ? "approved" : "pending"} />
      </div>

      <div className="flex flex-col gap-1 mt-3">
        <div className="text-sm">
          <span className="text-muted">Reg. No: </span>
          {request.registrationNumber}
        </div>
        <div className="text-sm">
          <span className="text-muted">Phone: </span>
          {request.phone}
        </div>
        {fullAddress && (
          <div className="text-sm">
            <span className="text-muted">Address: </span>
            {fullAddress}
          </div>
        )}
        <div className="text-sm">
          <span className="text-muted">Applied: </span>
          {new Date(request.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
};

export default PharmacistRequestCard;