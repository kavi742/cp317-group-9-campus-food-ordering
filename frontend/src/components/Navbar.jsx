import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const user = stored.data ? stored.data : stored;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/");
  };

  const goHome = () => {
    if (user.role === "EMPLOYEE") navigate("/employee");
    else if (user.role === "MANAGER") navigate("/manager");
    else navigate("/menu");
  };

  return (
    <div className="navbar">
      <span
        style={{ fontWeight: "700", fontSize: "18px", cursor: "pointer" }}
      >
        Campus Cafe
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "14px" }}>
          {user.name} ({user.role})
        </span>
        <button
          onClick={goHome}
          className="secondary"
          style={{ width: "auto", padding: "6px 14px", fontSize: "14px" }}
        >
          Home
        </button>
        <button
          onClick={handleLogout}
          className="danger"
          style={{ width: "auto", padding: "6px 14px", fontSize: "14px" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
