import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import "./StudentRequest.css";
import { dialog } from "../../components/CustomDialog";

// Category icons mapping
const categoryIcons = {
  "Basic Information": "👤",
  "Contact Information": "📞",
  "Guardian Details": "👨‍👩‍👧",
  "Academic Performance": "📚",
  "Other": "📝"
};

// Status icon component
const StatusIcon = ({ status }) => {
  const icons = {
    pending: "⏳",
    approved: "✓",
    rejected: "✕"
  };
  return <span className="status-icon">{icons[status] || "•"}</span>;
};

export default function StudentRequest() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [requests, setRequests] = useState([]);
  
  // Get student info from localStorage (no API call needed)
  const studentName = localStorage.getItem("name") || "Student";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/student/login");
      return;
    }
    // fetch my previous requests - API unchanged
    fetch("http://localhost:8000/student/request/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) setRequests(data.data);
      })
      .catch(err => console.error(err));
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !details) {
      dialog.error("Error", "Please select a category and add details");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:8000/student/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category, details }),
      });
      const data = await res.json();
      if (data.success) {
        dialog.success("Submitted", "Your request has been sent to the administration.");
        setCategory("");
        setDetails("");
        setRequests([data.data, ...requests]);
      } else {
        dialog.error("Error", data.message || "Failed to submit request");
      }
    } catch (err) {
      console.error(err);
      dialog.error("Error", "Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="request-layout">
      <StudentSidebar />
      <div className="request-content">
        <div className="request-container">
          {/* Student Info Header */}
          <div className="student-info-header">
            <div className="student-avatar">🎓</div>
            <div className="student-details">
              <span className="student-label">Welcome,</span>
              <h2 className="student-name">{studentName}</h2>
            </div>
          </div>
          
          <div className="request-form-card">
            <h3>Submit Change Request</h3>
            <p className="form-subtitle">
              Request modifications to your profile information
            </p>
          
            <form className="request-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category">
                  <span style={{ marginRight: '8px' }}>📋</span>
                  Change Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">-- choose --</option>
                  <option value="Basic Information">Basic Information</option>
                  <option value="Contact Information">Contact Information</option>
                  <option value="Guardian Details">Guardian Details</option>
                  <option value="Academic Performance">Academic Performance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="details">
                  <span style={{ marginRight: '8px' }}>✏️</span>
                  Details / Comments
                </label>
                <textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={5}
                  placeholder="Please describe the changes you need..."
                ></textarea>
              </div>

              <button type="submit" disabled={submitting} className="submit-btn">
                {submitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <span>🚀</span> Send Request
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="history-section">
            <h3>Your Previous Requests</h3>
            
            {requests.length > 0 ? (
              <ul className="request-list">
                {requests.map((req) => (
                  <li key={req._id} className={`req-item ${req.status}`}>
                    <div className="req-header">
                      <span className="req-category">
                        {categoryIcons[req.category] || "📝"} {req.category}
                      </span>
                      <span className="status-tag">
                        <StatusIcon status={req.status} />
                        {req.status}
                      </span>
                    </div>
                    <p className="req-details">{req.details}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📭</div>
                <p>No previous requests found. Submit your first request above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
