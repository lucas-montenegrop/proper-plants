import { useState } from "react";
import plantList from "./data";


export default function App() {
  const [plants] = useState(plantList);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // cart shape: { [id]: { plant, qty } }
  const [cart, setCart] = useState({});

  function addToCart(plant) {
    setCart((prev) => {
      const existing = prev[plant.id];
      const nextQty = (existing?.qty ?? 0) + 1;

      return {
        ...prev,
        [plant.id]: { plant, qty: nextQty },
      };
    });
  }

  function increaseQty(plantId) {
    setCart((prev) => {
      const entry = prev[plantId];
      if (!entry) return prev;

      return {
        ...prev,
        [plantId]: { ...entry, qty: entry.qty + 1 },
      };
    });
  }

  function decreaseQty(plantId) {
    setCart((prev) => {
      const entry = prev[plantId];
      if (!entry) return prev;

      const nextQty = entry.qty - 1;

      if (nextQty <= 0) {
        const { [plantId]: _removed, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [plantId]: { ...entry, qty: nextQty },
      };
    });
  }

  const cartItems = Object.values(cart); // [{ plant, qty }, ...]
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const cartTotal = cartItems.reduce(
    (sum, { plant, qty }) => sum + plant.price * qty,
    0
  );

  function formatMoney(n) {
    return `$${Number(n).toFixed(2)}`;
  }

  return (
    <>
      <style>{`
        .page {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          padding: 1rem;
          align-items: start;
        }

        .plant-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .plant-card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 1rem;
          background: #fff;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .plant-emoji {
          font-size: 3.25rem;
          line-height: 1;
          text-align: center;
        }

        .plant-name {
          font-weight: 700;
          font-size: 1.05rem;
        }

        .plant-price {
          opacity: 0.75;
        }

        .plant-card.selected {
          outline: 2px solid #040704ff;
          outline-offset: 2px;
        }

        .plant-card button {
          margin-top: auto;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          border: 2px solid #00b518ff;
          background: #00ff08ff;
          cursor: pointer;
        }

        .cart {
          position: sticky;
          top: 1rem;
        }

        .cart ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .cart-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.6rem 0;
          border-bottom: 1px solid #eee;
        }

        .cart-controls {
          display: grid;
          grid-template-columns: 1fr 2ch 1fr;
          gap: 0.5rem;
          align-items: center;
        }

        .cart-controls button {
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          border: 1px solid #00450cff;
          background: #d1ffcfff;
          cursor: pointer;
          min-width: 2.5rem;
        }

        .qty {
          text-align: center;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .page {
            grid-template-columns: 1fr;
          }
          .cart {
            position: static;
          }
          .plant-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .plant-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header style={{ padding: "1rem" }}>
        <h1>Proper Plants</h1>
      </header>

      <main className="page">
        {/* SHOP */}
        <section className="plants">
          <h2>Plants</h2>

          <ol className="plant-grid">
            {plants.map((plant) => (
              <li
                key={plant.id}
                onClick={() => setSelectedPlant(plant)}
                className={
                  selectedPlant?.id === plant.id
                    ? "plant-card selected"
                    : "plant-card"
                }
              >
                <div className="plant-emoji">{plant.image}</div>
                <div className="plant-name">{plant.name}</div>
                <div className="plant-price">{formatMoney(plant.price)}</div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(plant);
                  }}
                >
                  Add to cart 🛒🤑
                </button>
              </li>
            ))}
          </ol>
        </section>

        {/* CART */}
        <section className="cart">
          <h2>
            🛒 Cart <span style={{ fontWeight: "normal" }}>({cartCount})</span>
          </h2>

          {cartItems.length === 0 ? (
            <>
              <p>Your cart is empty.</p>
              <p style={{ fontWeight: 800 }}>
                Total: 🤑 {formatMoney(0)}
              </p>
            </>
          ) : (
            <>
              <ul>
                {cartItems.map(({ plant, qty }) => (
                  <li key={plant.id} className="cart-item">
                    <span>
                      <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
                        {plant.image}
                      </span>
                      {plant.name}{" "}
                      <span style={{ opacity: 0.7 }}>
                        ({formatMoney(plant.price)})
                      </span>
                    </span>

                    <div className="cart-controls">
                      <button type="button" onClick={() => decreaseQty(plant.id)}>
                        -
                      </button>
                      <span className="qty">{qty}</span>
                      <button type="button" onClick={() => increaseQty(plant.id)}>
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                }}
              >
                <span>Total</span>
                <span>🤑 {formatMoney(cartTotal)}</span>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
