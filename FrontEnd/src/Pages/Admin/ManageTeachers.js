import { useEffect, useState } from "react";
import { Container, Table, Button, Card, Row, Col } from "react-bootstrap";
import "./ManageTeachers.css";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/teachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTeachers(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8000/teacher/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        alert("Teacher deleted successfully");
        fetchTeachers();
      } else {
        alert("Error deleting teacher");
      }
    } catch (err) {
      alert("Error deleting teacher");
    }
  };

  return (
    <div className="manage-teachers-container">
      {/* Header */}
      <div className="header-section">
        <h2 className="header-title">Manage Teachers</h2>
        <p className="header-subtitle">View, edit and manage teacher accounts</p>
      </div>

      <Card className="table-card">
        <Card.Body style={{ padding: 0 }}>
          {loading ? (
            <div className="loading-state">Loading...</div>
          ) : teachers.length === 0 ? (
            <div className="empty-state">
              <p>No teachers found. Add a teacher to get started.</p>
            </div>
          ) : (
            <Table responsive className="table-custom">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={teacher._id}>
                    <td>{index + 1}</td>
                    <td><strong>{teacher.name}</strong></td>
                    <td>{teacher.email}</td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="action-btn action-btn-edit"
                        onClick={() => window.alert("Edit feature coming soon")}
                      >
                        ✏️ Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="action-btn action-btn-delete"
                        onClick={() => handleDelete(teacher._id)}
                      >
                        🗑️ Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
