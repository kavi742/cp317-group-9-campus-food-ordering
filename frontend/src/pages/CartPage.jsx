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
        <div className="page-header">
          <h1>Cart</h1>
          <p className="page-subtitle">Review your order before checkout.</p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">Your cart is empty.</div>
        ) : (
          <div className="card">
            <div className="cart-list">
              {cart.map((item, index) => (
                <div className="cart-row" key={index}>
                  <div>
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-meta">${Number(item.price).toFixed(2)}</div>
                  </div>
                <button className="danger" onClick={() => removeItem(index)}>Remove</button>
                </div>
              ))}
            </div>

            <div className="cart-summary"></div>
              <strong>Total: ${Number(total).toFixed(2)}</strong>
              <div className="cart-actions">
                <button className="secondary" onClick={() => navigate("/menu")}>Back to Menu</button>
                <button onClick={() => navigate("/checkout")}>Checkout</button>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}


export default CartPage;
