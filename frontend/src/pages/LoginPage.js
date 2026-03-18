import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data));
        if (data.role === "EMPLOYEE") navigate("/employee");
        else if (data.role === "MANAGER") navigate("/manager");
        else navigate("/menu");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>No account? <a href="/register">Register</a></p>
    </div>
  );
}

export default LoginPage;
