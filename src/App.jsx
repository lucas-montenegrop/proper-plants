import { useState } from "react";
import plantList from "./data/data";


import PlantList from "./plants/PlantList";
import Cart from "./cart/Cart";


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

  const cartItems = Object.values(cart);
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
      <header style={{ padding: "1rem" }}>
        <h1>Proper Plants</h1>
      </header>

      <main className="page">
        <section className="plants">
          <h2>Plants</h2>

          <PlantList
            plants={plants}
            selectedPlant={selectedPlant}
            setSelectedPlant={setSelectedPlant}
            addToCart={addToCart}
            formatMoney={formatMoney}
          />
        </section>

        <section className="cart">
          <Cart
            cartItems={cartItems}
            cartCount={cartCount}
            cartTotal={cartTotal}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            formatMoney={formatMoney}
          />
        </section>
      </main>
    </>
  );
}
