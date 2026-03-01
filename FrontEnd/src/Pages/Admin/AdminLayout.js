import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Admin";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <h3 className="logo">Admin Panel</h3>

        <p className="welcome">Welcome,<br/> {name}</p>

        <nav className="sidebar-nav">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/contacts">Contacts</Link>
          <Link to="/admin/addteacher">Add Teacher</Link>
          <Link to="/admin/teachers">Manage Teachers</Link>
          <Link to="/admin/settings">Settings</Link>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="admin-main-content">
        {children}
      </div>
    </div>
  );
}
