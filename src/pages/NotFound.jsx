import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-icon">🔎</div>
      <div className="not-found-title">Page not found</div>
      <div className="not-found-sub">
        The page you're looking for doesn't exist.
      </div>
      <Link to="/dashboard" className="not-found-link">
        ← Back to dashboard
      </Link>
    </div>
  );
};

export default NotFound;