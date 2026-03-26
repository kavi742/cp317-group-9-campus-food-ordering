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
      <h1 className="form-title">Create Account</h1>
      <p className="form-subtitle">Register for Campus Cafe</p>
      {error && <p className="error-msg">{error}</p>}
      
      <label className="form-label">Name</label>
      <input value={form.name}placeholder="Your name" onKeyDown={handleKeyDown} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      
      <label className="form-label">Email</label>
      <input value={form.email} placeholder="abcd1234@mylaurier.ca" type="email" onKeyDown={handleKeyDown} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      
      <label className="form-label">Password</label>
      <input value={form.password} placeholder="Password" type="password" onKeyDown={handleKeyDown} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      
      <button onClick={handleRegister} style={{ marginTop: "8px" }}>Register</button>
      
      <p className="form-footer">
        Already have an account? <a href="/">Sign in</a>
      </p>
    </div>
  );
}

export default RegisterPage;
