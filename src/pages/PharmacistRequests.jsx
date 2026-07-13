import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPharmacistRequests } from "../Reducer/PharmacistSlice";
import PharmacistRequestCard from "../components/PharmacistRequestCard";

const filters = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
];

const PharmacistRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector((s) => s.pharmacist);
  const [activeFilter, setActiveFilter] = useState("pending");

  useEffect(() => {
    dispatch(fetchPharmacistRequests(activeFilter));
  }, [dispatch, activeFilter]);

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Pharmacist Requests</div>
          <div className="page-subtitle">
            Review and approve pharmacy registration applications
          </div>
        </div>
      </div>

      <div className="status-pills">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`status-pill${activeFilter === f.key ? " active" : ""}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loader-wrap">
          <div className="loader" />
        </div>
      ) : requests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No {activeFilter} requests</div>
          <div className="empty-state-sub">
            New applications will show up here
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {requests.map((req) => (
            <PharmacistRequestCard key={req._id} request={req} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PharmacistRequests;