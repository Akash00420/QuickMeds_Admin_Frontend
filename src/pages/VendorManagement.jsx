import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchVendors } from "../Reducer/VendorSlice";

const VendorManagement = () => {
  const dispatch = useDispatch();
  const { vendors, loading } = useSelector((s) => s.vendor);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const filtered = vendors.filter(
    (v) =>
      v.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Vendor Management</div>
          <div className="page-subtitle">All approved pharmacy vendors</div>
        </div>
        <Link to="/vendors/add" className="btn btn-primary">
          + Add Vendor
        </Link>
      </div>

      <div className="filter-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search by shop name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loader-wrap">
          <div className="loader" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏪</div>
          <div className="empty-state-title">No vendors found</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Shop Name</th>
                <th>Owner</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v._id}>
                  <td>{v.name}</td>
                  <td>{v.owner?.name}</td>
                  <td>{v.email || v.owner?.email}</td>
                  <td>{v.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;