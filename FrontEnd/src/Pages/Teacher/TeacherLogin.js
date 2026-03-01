import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dialog } from "../../components/CustomDialog";
import "../Student/StudentLogin.css"
import logo from "../Images/clglogo.png";

export default function TeacherLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /* ===================== ADMIN LOGIN CHECK ===================== */
  const isAdminLogin = email.toLowerCase() === "admin@gmail.com" && password === "admin1";

  /* ===================== TEACHER/ADMIN LOGIN ===================== */
  const handleTeacherLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      dialog.warning("Required Fields", "Please fill all fields");
      return;
    }

    // Check for admin login
    if (isAdminLogin) {
      localStorage.setItem("token", "admin-token");
      localStorage.setItem("role", "admin");
      localStorage.setItem("name", "Admin");
      navigate("/admin/dashboard");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/teacher/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "teacher");
        localStorage.setItem("name", data.user.name);
        navigate("/teacher/dashboard");
      } else {
        dialog.error("Login Failed", data.message);
      }
    } catch (err) {
      dialog.error("Server Error", "Unable to connect to server. Please try again.");
    }
  };

  return (
    <div className="background1">
    <div className="container1 ">
      <div className="form-container sign-in-container">
        <form className="form1" onSubmit={handleTeacherLogin}>
          <img src={logo} alt="logo" className="login-logo" />
          <h2>Teacher Login</h2>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/">Forgot password?</Link>
          <button type="submit" className="btn">
            Sign In
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
