import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/pharmacist-requests", label: "Pharmacist Requests", icon: "📝" },
  { to: "/vendors", label: "Vendors", icon: "🏪" },
  { to: "/vendors/add", label: "Add Vendor", icon: "➕" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">
        <div className="auth-logo-mark">Q</div>
        <span>QuickMeds Admin</span>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            <span className="sidebar-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;