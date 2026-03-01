import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>
            <span>📍</span>
            Vidyanagri, Deopur, Dhule, Maharashtra 424005
          </p>
          <p>
            <span>📞</span>
            (02562) 272713, 272229, 272976
          </p>
          <p>
            <span>✉️</span>
            princi.ssvpspoly@gmail.com
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>About College</li>
            <li>Courses Offered</li>
            <li>Eligibility Criteria</li>
            <li>Fee Structure</li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div className="footer-col">
          <h3>Resources</h3>
          <ul>
            <li>MSBTE</li>
            <li>DTE</li>
            <li>AICTE</li>
            <li>Scholarships</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <span>f</span>
            <span>▶</span>
            <span>📷</span>
          </div>
        </div>
      </div>

      {/* BRAND & BOTTOM */}
      <div className="footer-brand">
        <h2>Bapusaheb Shivajirao Deore Polytechnic</h2>
        <p>Empowering students with secure, transparent academic systems</p>
      </div>

      <div className="footer-bottom">
        © 2026 B.S. Deore Polytechnic. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
