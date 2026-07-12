import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../store/Reducer/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/login");
  };

  return (
    <header className="vendor-navbar">
      <div />
      <div className="navbar-right">
        <span className="text-sm text-muted">{admin?.name || "Admin"}</span>
        <div className="avatar-btn">
          {admin?.name ? admin.name[0].toUpperCase() : "A"}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;