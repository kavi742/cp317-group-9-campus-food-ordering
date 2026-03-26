import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("CREDIT");
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handlePayment = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const items = cart.map((item) => ({
      menuItemId: item.id,
      quantity: 1,
      priceAtPurchase: item.price,
    }));

    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: user.id,
        paymentMethod,
        total,
        items,
      }),
    })
      .then((res) => {
        if (res.status === 402) {
          alert("Payment declined. Please try again.");
        } else if (res.ok) {
          localStorage.removeItem("cart");
          alert("Order placed successfully");
          navigate("/menu");
        } else {
          alert("Something went wrong");
        }
      })
      .catch(() => alert("Could not connect to server"));
  };

  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="page-header">
          <h1>Checkout</h1>
          <p className="page-subtitle">Review your order and select payment method.</p>
        </div>

        <div className="card checkout-card">
          {error && <p className="error-msg">{error}</p>}
          {message && <p className="success-msg">{message}</p>}
          <p>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>

          <div className="checkouut-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <label className="form-label">Payment Method</label>
          <slect value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="CREDIT">Credit</option>
            <option value="DEBIT">Debit</option>
            <option value="CASH">Cash</option>
            <option value="STUDENT_ACCOUNT">Student Account</option>
          </slect>
          <div className="cart-actions" style={{ marginTop: "6px" }}>
            <button className="secondary" onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
            <button onClick={handlePayment} disabled={cart.length === 0}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
