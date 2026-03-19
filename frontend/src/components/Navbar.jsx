import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
        onClick={goHome}
        style={{ fontWeight: "700", fontSize: "18px", cursor: "pointer" }}
      >
        Campus Cafe
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "14px" }}>
          {user.data ? user.data.name : user.name} ({user.data ? user.data.role : user.role})
        </span>
        <button
          onClick={handleLogout}
          className="secondary"
          style={{ width: "auto", padding: "6px 14px", fontSize: "14px" }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Navbar;
