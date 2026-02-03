import CartItem from "./CartItem";
import "./cart.css";

export default function Cart({
  cartItems,
  cartCount,
  cartTotal,
  increaseQty,
  decreaseQty,
  formatMoney,
}) {
  return (
    <>
      <h2>
        🛒 Cart <span style={{ fontWeight: "normal" }}>({cartCount})</span>
      </h2>

      {cartItems.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <p style={{ fontWeight: 800 }}>Total: 🤑 {formatMoney(0)}</p>
        </>
      ) : (
        <>
          <ul>
            {cartItems.map(({ plant, qty }) => (
              <CartItem
                key={plant.id}
                plant={plant}
                qty={qty}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                formatMoney={formatMoney}
              />
            ))}
          </ul>

          <div className="cart-total">
            <span>Total</span>
            <span>🤑 {formatMoney(cartTotal)}</span>
          </div>
        </>
      )}
    </>
  );
}
