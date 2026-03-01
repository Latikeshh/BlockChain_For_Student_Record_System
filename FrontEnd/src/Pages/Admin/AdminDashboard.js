import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import "../../Variables.css";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [adminName, setAdminName] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  /* ================= NAVIGATION ================= */
  const handleCardClick = (path) => {
    navigate(path);
  };

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/teacher/login");
    }
    setAdminName(localStorage.getItem("name") || "Admin");
  }, [token, role, navigate]);

  /* ================= GET COUNTS ================= */
  useEffect(() => {
    const fetchCounts = async () => {
      // Skip API calls for admin token, just set counts to 0
      if (token === "admin-token") {
        setStudentCount(0);
        setPendingCount(0);
        setVerifiedCount(0);
        setTeacherCount(0);
        return;
      }

      try {
        // Fetch student count
        const studentRes = await fetch("http://localhost:8000/student/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const studentData = await studentRes.json();
        if (studentRes.ok) {
          setStudentCount(studentData.count || 0);
        }

        // Fetch pending students
        const pendingRes = await fetch("http://localhost:8000/student/pending/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const pendingData = await pendingRes.json();
        if (pendingRes.ok) {
          setPendingCount(pendingData.count || 0);
        }

        // Fetch verified students
        const verifiedRes = await fetch("http://localhost:8000/student/verified/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const verifiedData = await verifiedRes.json();
        if (verifiedRes.ok) {
          setVerifiedCount(verifiedData.count || 0);
        }

        // Fetch teacher count
        const teacherRes = await fetch("http://localhost:8000/teacher/teachers/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const teacherData = await teacherRes.json();
        if (teacherRes.ok) {
          setTeacherCount(teacherData.count || 0);
        }

        // contact count
        try {
          const contactRes = await fetch("http://localhost:8000/contact/count", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const contactData = await contactRes.json();
          if (contactRes.ok) {
            setContactCount(contactData.count || 0);
          }
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCounts();
  }, [token]);

  /* ================= CARD DATA ================= */
  const statsCards = [
    { 
      title: "Total Teachers", 
      value: teacherCount, 
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
      path: "/admin/teachers",
      icon: "👨‍🏫" 
    },
    { 
      title: "Total Students", 
      value: studentCount, 
      bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)", 
      path: "/teacher/verifiedstudents",
      icon: "👨‍🎓" 
    },
    { 
      title: "Verified Students", 
      value: verifiedCount, 
      bg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", 
      path: "/teacher/verifiedstudents",
      icon: "✅" 
    },
    { 
      title: "Pending Requests", 
      value: pendingCount, 
      bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", 
      path: "/teacher/pending",
      icon: "⏳" 
    },
    {
      title: "Contacts",
      value: contactCount,
      bg: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
      path: "/admin/contacts",
      icon: "📩"
    },
  ];

  const actionCards = [
    {
      title: "Add New Teacher",
      description: "Create teacher accounts and manage access",
      icon: "➕",
      path: "/admin/addteacher",
      color: "#667eea"
    },
    {
      title: "Manage Teachers",
      description: "View, edit or remove teacher accounts",
      icon: "👥",
      path: "/admin/teachers",
      color: "#10b981"
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: "⚙️",
      path: "/admin/settings",
      color: "#6b7280"
    },
    {
      title: "Add Student",
      description: "Add new student records",
      icon: "📝",
      path: "/teacher/addstudent",
      color: "#3b82f6"
    },
    {
      title: "Verified Students",
      description: "View verified student records",
      icon: "📋",
      path: "/teacher/verifiedstudents",
      color: "#10b981"
    },
    {
      title: "Pending Students",
      description: "Review pending student requests",
      icon: "📥",
      path: "/teacher/pending",
      color: "#f59e0b"
    },
  ];

  return (
    <div className="admin-dashboard" style={{ padding: '20px' }}>
      {/* Stats Cards */}
      <div className="stats-section">
        <Row className="stats-row">
          {statsCards.map((card, idx) => (
            <Col md={6} lg={3} key={idx} className="mb-4">
              <div 
                className="stat-card" 
                onClick={() => handleCardClick(card.path)}
                style={{ background: card.bg }}
              >
                <div className="stat-icon">{card.icon}</div>
                <div className="stat-info">
                  <h3 className="stat-value">{card.value}</h3>
                  <p className="stat-title">{card.title}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Admin Actions */}
      <div className="actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <Row className="actions-row">
          {actionCards.map((action, idx) => (
            <Col md={6} lg={4} key={idx} className="mb-4">
              <div 
                className="action-card-new" 
                onClick={() => handleCardClick(action.path)}
                style={{ borderLeft: `4px solid ${action.color}` }}
              >
                <div className="action-icon">{action.icon}</div>
                <div className="action-info">
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
