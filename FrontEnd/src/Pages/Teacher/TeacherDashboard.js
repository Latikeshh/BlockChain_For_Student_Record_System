import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dialog } from "../../components/CustomDialog";
import "../Teacher/TeacherDashboard.css";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Teacher";

  const [stats, setStats] = useState({
    totalStudents: 0,
    verifiedStudents: 0,
    pendingStudents: 0,
    contacted: 0,
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  /* ================= NAVIGATION ================= */
  const handleCardClick = (type) => {
    switch (type) {
      case "student":
        navigate("/teacher/addstudent");
        break;
      case "verified":
        navigate("/teacher/verifiedstudents");
        break;
      case "pending":
        navigate("/teacher/pending");
        break;
      case "comments":
      case "contacts":
        navigate("/teacher/contacts");
        break;
      default:
        break;
    }
  };

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!token) {
      navigate("/teacher/login");
    }
  }, [token, navigate]);

  /* ================= FETCH STATS ================= */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:8000/student/getst", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (res.ok) {
          const students = await res.json();
          
          const verified = students.filter(s => s.verify === true).length;
          const pending = students.filter(s => s.verify === false).length;
          
          setStats((prev) => ({
            ...prev,
            totalStudents: students.length,
            verifiedStudents: verified,
            pendingStudents: pending,
          }));
        }

        // fetch contact count separately
        try {
          const contactRes = await fetch("http://localhost:8000/contact/count", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const contactData = await contactRes.json();
          if (contactRes.ok) {
            setStats((prev) => ({ ...prev, contacted: contactData.count || 0 }));
          }
        } catch (err) {
          console.error("contact count error", err);
        }
      } catch (err) {
        console.error(err);
        dialog.error("Error", "Failed to fetch statistics");
      } finally {
        setLoading(false);
      }
    };
    
    if (token) {
      fetchStats();
    }
  }, [token]);

  /* ================= GET CURRENT DATE ================= */
  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  /* ================= STATS DATA ================= */
  const statsData = [
    { 
      label: "Total Students", 
      number: stats.totalStudents, 
      icon: "👨‍🎓",
      type: "primary",
      onClick: () => handleCardClick("student")
    },
    { 
      label: "Verified Students", 
      number: stats.verifiedStudents, 
      icon: "✅",
      type: "success",
      onClick: () => handleCardClick("verified")
    },
    { 
      label: "Pending Students", 
      number: stats.pendingStudents, 
      icon: "⏳",
      type: "warning",
      onClick: () => handleCardClick("pending")
    },
    { 
      label: "Contacted", 
      number: stats.contacted, 
      icon: "📩",
      type: "info",
      onClick: () => handleCardClick("contacts")
    },
  ];

  /* ================= QUICK ACTIONS ================= */
  const quickActions = [
    {
      icon: "➕",
      title: "Add New Student",
      description: "Register a new student in the system",
      onClick: () => navigate("/teacher/addstudent")
    },
    {
      icon: "✅",
      title: "Verify Students",
      description: "Review and verify student applications",
      onClick: () => navigate("/teacher/verifiedstudents")
    },
    {
      icon: "⏳",
      title: "Pending Requests",
      description: "View pending student requests",
      onClick: () => navigate("/teacher/requests")
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Welcome back, {name}! 👋</h1>
          <p className="header-subtitle">Here's what's happening with your students today.</p>
          <p className="header-date">{getCurrentDate()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            {statsData.map((stat, idx) => (
              <div 
                key={idx} 
                className={`stat-card-modern ${stat.type}`}
                onClick={stat.onClick}
              >
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* verification overview chart */}
          <div className="stats-chart">
            <h2 className="section-heading">Verification Overview</h2>
            <div className="chart-bar">
              {stats.totalStudents > 0 ? (
                <>
                  <div
                    className="segment verified"
                    style={{ flex: stats.verifiedStudents }}
                  />
                  <div
                    className="segment pending"
                    style={{ flex: stats.pendingStudents }}
                  />
                </>
              ) : (
                <div className="segment" style={{ flex: 1, background: '#e5e7eb' }} />
              )}
            </div>
            <div className="chart-legend">
              <span>
                <span className="legend-color verified" /> Verified: {stats.verifiedStudents}
              </span>
              <span>
                <span className="legend-color pending" /> Pending: {stats.pendingStudents}
              </span>
              <span>Total: {stats.totalStudents}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2 className="section-heading">Quick Actions</h2>
            <div className="actions-grid">
              {quickActions.map((action, idx) => (
                <div 
                  key={idx} 
                  className="action-card"
                  onClick={action.onClick}
                >
                  <div className="action-icon-box">
                    {action.icon}
                  </div>
                  <div className="action-details">
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}