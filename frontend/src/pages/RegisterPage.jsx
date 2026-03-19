import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) navigate("/");
        else setError("Registration failed.");
      })
      .catch(() => setError("Could not connect to server."));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="form-container">
      <h1 style={{ marginBottom: "8px", fontSize: "24px" }}>Create Account</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>Register for Campus Cafe</p>
      {error && <p className="error-msg">{error}</p>}
      <label style={{ fontSize: "14px", fontWeight: "600" }}>Name</label>
      <input placeholder="Your name" onKeyDown={handleKeyDown} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <label style={{ fontSize: "14px", fontWeight: "600" }}>Email</label>
      <input placeholder="you@school.ca" type="email" onKeyDown={handleKeyDown} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <label style={{ fontSize: "14px", fontWeight: "600" }}>Password</label>
      <input placeholder="Password" type="password" onKeyDown={handleKeyDown} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister} style={{ marginTop: "8px" }}>Register</button>
      <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "var(--text-secondary)" }}>
        Already have an account? <a href="/">Sign in</a>
      </p>
    </div>
  );
}

export default RegisterPage;
