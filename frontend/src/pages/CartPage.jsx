import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));
  const navigate = useNavigate();

  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Navbar />
      <div className="page">
        <h1>Cart</h1>
        {cart.length === 0 && <p>Your cart is empty.</p>}
        {cart.map((item, index) => (
          <div key={index}>
            <span>{item.name} - ${item.price}</span>
            <button className="danger" style={{ width: "auto", marginLeft: "8px" }} onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
        <p style={{ marginTop: "16px" }}>Total: ${total.toFixed(2)}</p>
        <button className="secondary" style={{ marginTop: "8px" }} onClick={() => navigate("/menu")}>Back to Menu</button>
        <button style={{ marginTop: "8px" }} onClick={() => navigate("/checkout")}>Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;
