import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { dialog } from "../../components/CustomDialog";
import "./AdminSettings.css";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Blockchain Student Record System",
    allowStudentRegistration: true,
    requireEmailVerification: false,
    maxFileSize: 5,
    retentionDays: 365
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dialog.success("Settings Saved", "Your settings have been saved successfully!");
  };

  return (
    <div className="admin-settings-container">
      {/* Header */}
      <div className="header-section">
        <h2 className="header-title">System Settings</h2>
        <p className="header-subtitle">Configure system preferences and options</p>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="settings-card">
            <Card.Body className="settings-card-body">
              <Form onSubmit={handleSubmit}>
                {/* General Settings */}
                <h5 className="section-title">General Settings</h5>
                <Form.Group className="mb-3">
                  <Form.Label className="form-label-custom">Site Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="form-control-custom"
                  />
                </Form.Group>

                {/* Registration Settings */}
                <h5 className="section-title">Registration Settings</h5>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="allowStudentRegistration"
                    label="Allow Student Registration"
                    checked={settings.allowStudentRegistration}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="requireEmailVerification"
                    label="Require Email Verification"
                    checked={settings.requireEmailVerification}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Data Settings */}
                <h5 className="section-title">Data Settings</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">Max File Size (MB)</Form.Label>
                      <Form.Control
                        type="number"
                        name="maxFileSize"
                        value={settings.maxFileSize}
                        onChange={handleChange}
                        min="1"
                        max="50"
                        className="form-control-custom"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label-custom">Data Retention (Days)</Form.Label>
                      <Form.Control
                        type="number"
                        name="retentionDays"
                        value={settings.retentionDays}
                        onChange={handleChange}
                        min="30"
                        max="1825"
                        className="form-control-custom"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="save-btn">
                  Save Settings
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

       

        
        
      </Row>
    </div>
  );
}
