import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({ type: "success", msg: "Message sent successfully!" });
        setForm({ firstName: "", lastName: "", email: "", phone: "", purpose: "", message: "" });
      } else {
        setFeedback({ type: "error", msg: data.message || "Failed to send" });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: "error", msg: "Server error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>Any question or remark? Kindly message us.</p>
        </div>
      </section>

      {/* MAIN CARD */}
      <section className="contact-section">
        <div className="contact-card">
          {/* LEFT SIDE */}
          <div className="contact-left">
            <h3>Contact Information</h3>
            <p>Say something to start a chat.</p>

            <div className="contact-info">
              <p>
                <span>📞</span>
                (02562) 272713<br />
                272229<br />
                272976
              </p>
              <p>
                <span>✉️</span>
                princi.ssvpspoly@gmail.com
              </p>
              <p>
                <span>📍</span>
                Vidyanagri, Deopur, Dhule,<br />
                Maharashtra 424005, India.
              </p>
            </div>

            <div className="contact-socials">
              <a href="#" title="Facebook">
                f
              </a>
              <a href="#" title="YouTube">
                ▶
              </a>
              <a href="#" title="Instagram">
                📷
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-right">
            <h3>Send us a Message</h3>
            {feedback && (
              <p className={feedback.type === "error" ? "feedback-error" : "feedback-success"}>
                {feedback.msg}
              </p>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div>
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <label className="purpose-label">Purpose?</label>
              <div className="purpose-options">
                <label>
                  <input
                    type="radio"
                    name="purpose"
                    value="General Inquiry"
                    checked={form.purpose === "General Inquiry"}
                    onChange={handleChange}
                  />
                  General Inquiry
                </label>
                <label>
                  <input
                    type="radio"
                    name="purpose"
                    value="Admission"
                    checked={form.purpose === "Admission"}
                    onChange={handleChange}
                  />
                  Admission
                </label>
                <label>
                  <input
                    type="radio"
                    name="purpose"
                    value="Support"
                    checked={form.purpose === "Support"}
                    onChange={handleChange}
                  />
                  Support
                </label>
              </div>

              <label>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
              ></textarea>

              <button type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="contact-map-section">
        <div className="map-card">
          <h3>Find Us Here</h3>
          <div className="map-placeholder">
            Map integration can be added here (Google Maps)
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
