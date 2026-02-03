export default function CartItem({
  plant,
  qty,
  increaseQty,
  decreaseQty,
  formatMoney,
}) {
  return (
    <li className="cart-item">
      <span>
        <span style={{ fontSize: "1.1rem", marginRight: "0.5rem" }}>
          {plant.image}
        </span>
        {plant.name}{" "}
        <span style={{ opacity: 0.7 }}>({formatMoney(plant.price)})</span>
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
  );
}
