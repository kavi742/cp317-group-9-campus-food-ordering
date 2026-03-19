import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function MenuPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/menu").then((res) => res.json()).then(setItems);
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const goToCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div>
      <Navbar />
      <div className="page">
        <h1>Menu</h1>
        {items.map((item) => (
          <div key={item.id}>
            <span>{item.name} - ${item.price}</span>
            <button onClick={() => addToCart(item)} disabled={!item.available}>
              {item.available ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        ))}
        <button onClick={goToCart}>View Cart ({cart.length})</button>
      </div>
    </div>
  );
}

export default MenuPage;
