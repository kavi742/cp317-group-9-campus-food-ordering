import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

function EmployeePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((res) => setItems(res.data || []));
  }, []);

  const toggleAvailability = (item) => {
    fetch(`/api/menu/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, available: !item.available }),
    })
      .then((res) => res.json())
      .then(() => {
        setItems(items.map((i) =>
          i.id === item.id ? { ...i, available: !i.available } : i
        ));
      });
  };

  return (
    <div>
      <Navbar />
      <div className="page">
        <h1>Employee - Stock Management</h1>
        {items.map((item) => (
          <div key={item.id} className="card" style={{ marginBottom: "12px" }}>
            <span>{item.name} — {item.available ? "Available" : "Out of Stock"}</span>
            <button
              className="secondary"
              style={{ width: "auto", marginLeft: "16px" }}
              onClick={() => toggleAvailability(item)}
            >
              {item.available ? "Mark Out of Stock" : "Mark Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeePage;
