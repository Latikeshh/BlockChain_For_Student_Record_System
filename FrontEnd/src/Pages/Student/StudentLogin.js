import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dialog } from "../../components/CustomDialog";
import "./StudentLogin.css";
import logo from "../Images/clglogo.png";

export default function StudentLogin() {
  const [enroll, setEnroll] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleStudentLogin = async (e) => {
    e.preventDefault();

    if (!enroll || !password) {
      dialog.warning("Required Fields", "Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enroll, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", "student");
        localStorage.setItem("name", data.user.name);
        navigate("/student/dashboard");
      } else {
        dialog.error("Login Failed", data.message);
      }
    } catch (err) {
      dialog.error("Server Error", "Unable to connect to server. Please try again.");
    }
  };

  return (
    <div className="background1">
      <div className="container1">
        <div className="form-container sign-in-container">
          <form className="form1" onSubmit={handleStudentLogin}>
            <img src={logo} alt="logo" className="login-logo" />
            <h2>Student Login</h2>
            <input
              type="text"
              inputMode="numeric"
              maxLength={11}
              placeholder="Enrollment Number"
              value={enroll}
              onChange={(e) => setEnroll(e.target.value)}
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
