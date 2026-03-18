import { useEffect, useState } from "react";

function ManagerPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", price: 0, quantity: 0, description: "", available: true });

  useEffect(() => {
    fetch("/api/menu").then((res) => res.json()).then(setItems);
  }, []);

  const addItem = () => {
    fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    }).then((res) => res.json()).then((item) => setItems([...items, item]));
  };

  const deleteItem = (id) => {
    fetch(`/api/menu/${id}`, { method: "DELETE" }).then(() => {
      setItems(items.filter((i) => i.id !== id));
    });
  };

  return (
    <div>
      <h1>Manager - Inventory</h1>
      <h2>Add Item</h2>
      <input placeholder="Name" onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
      <input placeholder="Category" onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
      <input placeholder="Price" type="number" onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} />
      <input placeholder="Quantity" type="number" onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })} />
      <input placeholder="Description" onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
      <button onClick={addItem}>Add Item</button>

      <h2>Current Inventory</h2>
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name} - ${item.price} - {item.available ? "Available" : "Out of Stock"}</span>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ManagerPage;
