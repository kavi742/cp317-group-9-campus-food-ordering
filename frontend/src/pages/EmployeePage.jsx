import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

function EmployeePage() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState({});

  useEffect(() => {
    const fetchOrders = () => {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((res) => setOrders(res.data || []));
    };

    const fetchMenu = () => {
      fetch("/api/menu")
        .then((res) => res.json())
        .then((res) => setItems(res.data || []));
    };

    // Initial load
    fetchOrders();
    fetchMenu();

    // Poll every 5 seconds
    const interval = setInterval(fetchOrders, 5000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  const loadOrderItems = (orderId) => {
    if (orderItems[orderId]) return;
    fetch(`/api/orders/${orderId}/items`)
      .then((res) => res.json())
      .then((res) => {
        setOrderItems((prev) => ({ ...prev, [orderId]: res.data || [] }));
      });
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

  const updateStatus = (order, newStatus) => {
    fetch(`/api/orders/${order.id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus),
    })
      .then((res) => res.json())
      .then(() => {
        setOrders(orders.map((o) =>
          o.id === order.id ? { ...o, status: newStatus } : o
        ));
      });
  };

  const getNextStatus = (status) => {
    if (status === "CONFIRMED") return "PREPARING";
    if (status === "PREPARING") return "READY";
    if (status === "READY") return "FULFILLED";
    return null;
  };

  const activeOrders = orders.filter((o) => o.status !== "FULFILLED");
  const fulfilledOrders = orders.filter((o) => o.status === "FULFILLED");

  return (
    <div>
      <Navbar />
      <div className="page">

        <h1 style={{ marginBottom: "24px" }}>Employee Dashboard</h1>

        <h2 style={{ marginBottom: "12px" }}>Active Orders</h2>
        {activeOrders.length === 0 && <p style={{ color: "var(--text-secondary)" }}>No active orders.</p>}
        {activeOrders.map((order) => {
          const next = getNextStatus(order.status);
          return (
            <div
              key={order.id}
              className="card"
              style={{ marginBottom: "12px" }}
              onClick={() => loadOrderItems(order.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontWeight: "600" }}>Order #{order.id}</p>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
                    Customer #{order.customerId} — ${order.total} — {order.paymentMethod}
                  </p>
                  {orderItems[order.id] && (
                    <ul style={{ marginTop: "8px", fontSize: "14px", paddingLeft: "16px" }}>
                      {orderItems[order.id].map((item) => (
                        <li key={item.id}>Item #{item.menuItemId} x{item.quantity} — ${item.priceAtPurchase}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span>
                  {next && (
                    <button
                      style={{ width: "auto" }}
                      onClick={(e) => { e.stopPropagation(); updateStatus(order, next); }}
                    >
                      Mark {next}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <h2 style={{ marginTop: "32px", marginBottom: "12px" }}>Completed Orders</h2>
        {fulfilledOrders.length === 0 && <p style={{ color: "var(--text-secondary)" }}>No completed orders.</p>}
        {fulfilledOrders.map((order) => (
          <div key={order.id} className="card" style={{ marginBottom: "12px", opacity: "0.6" }}>
            <p style={{ fontWeight: "600" }}>Order #{order.id}</p>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Customer #{order.customerId} — ${order.total}
            </p>
            <span className="badge fulfilled">FULFILLED</span>
          </div>
        ))}

        <h2 style={{ marginTop: "32px", marginBottom: "12px" }}>Stock Management</h2>
        {items.map((item) => (
          <div key={item.id} className="card" style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{item.name} — {item.available ? "Available" : "Out of Stock"}</span>
            <button
              className="secondary"
              style={{ width: "auto" }}
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
