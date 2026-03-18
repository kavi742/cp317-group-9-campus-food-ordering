import { useEffect, useState } from "react";

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
      <h1>Order History</h1>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order #{order.id} - {order.status} - ${order.total} - {order.paymentMethod}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderHistoryPage;
