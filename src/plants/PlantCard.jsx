export default function PlantCard({
  plant,
  selected,
  onSelect,
  addToCart,
  formatMoney,
}) {
  return (
    <li
      onClick={onSelect}
      className={selected ? "plant-card selected" : "plant-card"}
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
  );
}
