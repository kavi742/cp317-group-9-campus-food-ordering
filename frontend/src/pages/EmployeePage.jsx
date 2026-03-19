import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

function EmployeePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu").then((res) => res.json()).then(setItems);
  }, []);

  const toggleAvailability = (item) => {
    fetch(`/api/menu/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, available: !item.available }),
    }).then(() => {
      setItems(items.map((i) => i.id === item.id ? { ...i, available: !i.available } : i));
    });
  };

  return (
    <div>
      <Navbar />
      <div className="page">
        <h1>Employee - Stock Management</h1>
        {items.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <button onClick={() => toggleAvailability(item)}>
              {item.available ? "Mark Out of Stock" : "Mark Available"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeePage;
