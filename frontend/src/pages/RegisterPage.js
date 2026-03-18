import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = () => {
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => navigate("/"));
  };

  return (
    <div>
      <h1>Register</h1>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterPage;
