import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <h1>Cart</h1>
      {cart.map((item, index) => (
        <div key={index}>
          <span>{item.name} - ${item.price}</span>
          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={() => navigate("/menu")}>Back to Menu</button>
      <button onClick={() => navigate("/checkout")}>Checkout</button>
    </div>
  );
}

export default CartPage;
