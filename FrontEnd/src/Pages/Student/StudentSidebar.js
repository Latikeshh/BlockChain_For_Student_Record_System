import { Link, useNavigate } from "react-router-dom";
import "./StudentSidebar.css";

export default function StudentSidebar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="student-sidebar">
      <h3 className="logo">Student Panel</h3>

      <p className="welcome">Welcome,<br/> {name}</p>

      <nav className="sidebar-nav">
        <Link to="/">Home</Link>
        <Link to="/student/dashboard">Dashboard</Link>
        <Link to="/student/profile">My Profile</Link>
        <Link to="/student/status">Verified Status</Link>
        <Link to="/student/request">
          <span className="link-icon">📝</span> Request
        </Link>
      </nav>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
