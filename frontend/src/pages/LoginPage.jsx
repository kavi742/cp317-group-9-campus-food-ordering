import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ------------------------------------------------------------------
// Every page in this app follows this same structure:
//
// 1. Import useState for managing form/data state
// 2. Import useNavigate to redirect the user after an action
// 3. Define state variables for each input field
// 4. Write a handler function that calls the backend with fetch()
// 5. Return JSX that renders the UI
// ------------------------------------------------------------------

function LoginPage() {

  // ----------------------------------------------------------------
  // STATE
  // useState gives us a variable and a function to update it.
  // When the variable updates, React re-renders the component.
  // Format: const [variable, setVariable] = useState(initialValue);
  // ----------------------------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ----------------------------------------------------------------
  // NAVIGATION
  // useNavigate gives us a function to redirect the user to a
  // different page. Call navigate("/path") to redirect.
  // ----------------------------------------------------------------
  const navigate = useNavigate();

  // ----------------------------------------------------------------
  // HANDLER
  // This function runs when the user clicks the Login button.
  // It sends a POST request to the backend with the email and
  // password, then redirects based on the user's role.
  // ----------------------------------------------------------------
  const handleLogin = () => {
    // Clear any previous error message
    setError("");

    // Basic check before hitting the backend
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // fetch() sends an HTTP request to the backend
    // The proxy in package.json forwards this to localhost:8080
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        // If the backend returns 401, the login failed
        if (res.status === 401) {
          setError("Invalid email or password.");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;

        // Store the logged in user in localStorage so other
        // pages can access the user id and role
        localStorage.setItem("user", JSON.stringify(data));

        // Redirect based on role
        if (data.role === "EMPLOYEE") navigate("/employee");
        else if (data.role === "MANAGER") navigate("/manager");
        else navigate("/menu");
      })
      .catch(() => {
        setError("Could not connect to the server. Is the backend running?");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  // ----------------------------------------------------------------
  // RENDER
  // This is the JSX that gets rendered to the screen.
  // Use className to apply styles from index.css.
  // ----------------------------------------------------------------
  return (
    <div className="form-container">

      <h1 className="form-title">
        Campus Cafe
      </h1>
      <p className="form-subtitle">
        Sign in to your account
      </p>

      {/* Error message -- only shows when error state is not empty */}
      {error && <p className="error-msg">{error}</p>}

      <label className="form-label">Email</label>
      <input
        type="email"
        placeholder="you@school.ca"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <label className="form-label">Password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleLogin} style={{ marginTop: "8px" }}>
        Sign In
      </button>

      <p className="form-footer">
        No account? <a href="/register">Register here</a>
      </p>

    </div>
  );
}

export default LoginPage;
