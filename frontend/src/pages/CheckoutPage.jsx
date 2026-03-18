import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("CREDIT");
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handlePayment = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: user.id,
        paymentMethod,
        total,
        items: cart,
      }),
    }).then((res) => {
      if (res.ok) {
        localStorage.removeItem("cart");
        alert("Order placed successfully");
        navigate("/menu");
      } else {
        alert("Payment failed");
      }
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="CREDIT">Credit</option>
        <option value="DEBIT">Debit</option>
        <option value="CASH">Cash</option>
        <option value="STUDENT_ACCOUNT">Student Account</option>
      </select>
      <button onClick={handlePayment}>Place Order</button>
    </div>
  );
}

export default CheckoutPage;
