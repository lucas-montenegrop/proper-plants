import PlantCard from "./PlantCard";
import "./plants.css";

export default function PlantList({
  plants,
  selectedPlant,
  setSelectedPlant,
  addToCart,
  formatMoney,
}) {
  return (
    <ol className="plant-grid">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          selected={selectedPlant?.id === plant.id}
          onSelect={() => setSelectedPlant(plant)}
          addToCart={addToCart}
          formatMoney={formatMoney}
        />
      ))}
    </ol>
  );
}
