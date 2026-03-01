import { Link, useNavigate } from "react-router-dom";
import "./Siderbar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Teacher";

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="teacher-sidebar">
      <h3 className="logo">Teacher Panel</h3>
      
      <p className="welcome">Welcome,<br/> {name}</p>

      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
          <span className="nav-icon">🏠</span>
          Home
        </Link>
        <Link to="/teacher/dashboard" className="nav-item">
          <span className="nav-icon">📊</span>
          Dashboard
        </Link>
        <Link to="/teacher/verifiedstudents" className="nav-item">
          <span className="nav-icon">✅</span>
          Verified Students
        </Link>
        <Link to="/teacher/pending" className="nav-item">
          <span className="nav-icon">⏳</span>
          Pending Students
        </Link>
        <Link to="/teacher/requests" className="nav-item">
          <span className="nav-icon">📝</span>
          Change Requests
        </Link>
        <Link to="/teacher/contacts" className="nav-item">
          <span className="nav-icon">📩</span>
          Contacts
        </Link>
      </nav>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>
    </div>
  );
}
