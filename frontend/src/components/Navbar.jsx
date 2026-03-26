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
    <header className="navbar">
      <div className="navbar-inner">
        <span className="navbar-brand" onClick={goHome}>
          Campus Cafe
        </span>

        <div className="navbar-right">
          <span className="navbar-user">
            {user.name} ({user.role})
          </span>

          <button onClick={goHome} className="secondary">
            Home
          </button>

          <button onClick={handleLogout} className="danger">
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
