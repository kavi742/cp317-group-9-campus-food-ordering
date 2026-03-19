import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

function ManagerPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "", category: "", price: 0, quantity: 0, description: "", available: true
  });

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((res) => setItems(res.data || []));
  }, []);

  const addItem = () => {
    fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((res) => setItems([...items, res.data]));
  };

  const deleteItem = (id) => {
    fetch(`/api/menu/${id}`, { method: "DELETE" })
      .then(() => setItems(items.filter((i) => i.id !== id)));
  };

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
        <h1>Manager - Inventory</h1>

        <div className="card" style={{ marginBottom: "24px" }}>
          <h2 style={{ marginBottom: "12px" }}>Add Item</h2>
          <input placeholder="Name" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
          <input placeholder="Category" onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
          <input placeholder="Price" type="number" onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} />
          <input placeholder="Quantity" type="number" onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })} />
          <input placeholder="Description" onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
          <button onClick={addItem}>Add Item</button>
        </div>

        <h2 style={{ marginBottom: "12px" }}>Current Inventory</h2>
        {items.map((item) => (
          <div key={item.id} className="card" style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{item.name} — ${item.price} — {item.available ? "Available" : "Out of Stock"}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="secondary"
                style={{ width: "auto" }}
                onClick={() => toggleAvailability(item)}
              >
                {item.available ? "Mark Out of Stock" : "Mark Available"}
              </button>
              <button
                className="danger"
                style={{ width: "auto" }}
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerPage;
