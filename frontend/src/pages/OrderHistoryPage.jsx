import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetch(`/api/orders/customer/${user.id}`)
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page">
        <h1>Order History</h1>
        {orders.map((order) => (
          <div key={order.id}>
            <p>Order #{order.id} - {order.status} - ${order.total} - {order.paymentMethod}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistoryPage;
