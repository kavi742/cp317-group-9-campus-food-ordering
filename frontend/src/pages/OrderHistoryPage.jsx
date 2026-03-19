import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.id) return;
    fetch(`/api/orders/customer/${user.id}`)
      .then((res) => res.json())
      .then((res) => setOrders(res.data || []));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page">
        <h1>Order History</h1>
        {orders.length === 0 && <p>No orders found.</p>}
        {orders.map((order) => (
          <div key={order.id} className="card" style={{ marginBottom: "12px" }}>
            <p>Order #{order.id}</p>
            <p>Status: <span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span></p>
            <p>Total: ${order.total}</p>
            <p>Payment: {order.paymentMethod}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistoryPage;
