import { useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function MenuPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((res) => setItems(res.data || "[]"))
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const groupedItems = useMemo(() => {
    return items.reduce((groups, item) => {
      const category = item.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    }, {});
  }, [items]);

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
        <div className="page-header">
          <h1>Menu</h1>
            <p className="page-subtitle">Some catchprase for the store here.</p>
        </div>

        {Object.keys(groupedItems).length === 0 ? (
          <div className="empty-state">No menu items available right now.</div>
        ) : (
          Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <h2 className="section-title">{category}</h2>

              <div className="item-grid">
                {categoryItems.map((item) => (
                  <div key={item.id} className="card menu-card">
                    <div className="menu-card-top">
                      <div>
                        <div className="menu-name">{item.name}</div>
                        <div className="menu-category">{item.category}</div>
                      </div>
                      <div className="menu-price">${item.price.toFixed(2)}</div>
                    </div>

                    <p className="menu-description">{item.description || "No description available."}</p>
                    
                    <button onClick={() => addToCart(item)}
                    disabled={!item.available}>
                      {item.available ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <div style={{marginTop: "28px" }}>
          <button onClick={goToCart}>View Cart ({cart.length})</button>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
