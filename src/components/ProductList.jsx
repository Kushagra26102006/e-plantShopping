import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/CartSlice";
import { FaShoppingCart } from "react-icons/fa";

const plantData = [
  {
    category: "Air Purifying",
    plants: [
      { id: "ap1", name: "Snake Plant", image: "https://images.unsplash.com/photo-1580910051071-5bf5ddc4a7c5?auto=format&fit=crop&w=400&q=60", cost: 25 },
      { id: "ap2", name: "Peace Lily", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=60", cost: 30 },
      { id: "ap3", name: "Boston Fern", image: "https://images.unsplash.com/photo-1519389950479-7d57d0bca1db?auto=format&fit=crop&w=400&q=60", cost: 22 },
      { id: "ap4", name: "Spider Plant", image: "https://images.unsplash.com/photo-1526312426976-f7a6e6f2fbb0?auto=format&fit=crop&w=400&q=60", cost: 19 },
      { id: "ap5", name: "Rubber Plant", image: "https://images.unsplash.com/photo-1581320549490-1b4ebcb7e5f2?auto=format&fit=crop&w=400&q=60", cost: 28 },
      { id: "ap6", name: "Aloe Vera", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=60", cost: 20 },
    ],
  },
  {
    category: "Low Light",
    plants: [
      { id: "ll1", name: "ZZ Plant", image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=400&q=60", cost: 22 },
      { id: "ll2", name: "Pothos", image: "https://images.unsplash.com/photo-1519452635269-cb1fe8c7c8bd?auto=format&fit=crop&w=400&q=60", cost: 18 },
      { id: "ll3", name: "Philodendron", image: "https://images.unsplash.com/photo-1559627611-3eb8ad5c2f86?auto=format&fit=crop&w=400&q=60", cost: 24 },
      { id: "ll4", name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1572363886995-4e58d5b9bd1c?auto=format&fit=crop&w=400&q=60", cost: 27 },
      { id: "ll5", name: "Dracaena", image: "https://images.unsplash.com/photo-1602526218695-2bba6aa2d7b5?auto=format&fit=crop&w=400&q=60", cost: 26 },
      { id: "ll6", name: "Parlor Palm", image: "https://images.unsplash.com/photo-1594941313174-0c8f7e5e8f9e?auto=format&fit=crop&w=400&q=60", cost: 23 },
    ],
  },
  {
    category: "Low Maintenance",
    plants: [
      { id: "lm1", name: "Jade Plant", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=60", cost: 24 },
      { id: "lm2", name: "Cactus Mix", image: "https://images.unsplash.com/photo-1559237740-58b9e5ddcfd9?auto=format&fit=crop&w=400&q=60", cost: 15 },
      { id: "lm3", name: "ZZ Plant (Mini)", image: "https://images.unsplash.com/photo-1522205401458-b3d7b9ebc1a5?auto=format&fit=crop&w=400&q=60", cost: 18 },
      { id: "lm4", name: "Staghorn Fern", image: "https://images.unsplash.com/photo-1586952471235-0e2dcad9e2fd?auto=format&fit=crop&w=400&q=60", cost: 30 },
      { id: "lm5", name: "Snake Plant (Mini)", image: "https://images.unsplash.com/photo-1580934124951-7c79f6edc2bb?auto=format&fit=crop&w=400&q=60", cost: 16 },
      { id: "lm6", name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1506812574056-28e6ebf3c31b?auto=format&fit=crop&w=400&q=60", cost: 21 },
    ],
  },
];

export default function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const [addedIds, setAddedIds] = useState([]);

  const handleAdd = (plant) => {
    dispatch(addItem(plant));
    setAddedIds((prev) => [...prev, plant.id]);
  };

  return (
    <>
      {/* ---------- Navbar ---------- */}
      <nav className="navbar">
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("landing"); }}>
            Home
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate("products"); }}>
            Plants
          </a>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaShoppingCart size={20} onClick={() => onNavigate("cart")} />
          <span>{cartCount}</span>
        </div>
      </nav>

      {/* ---------- Product Grid ---------- */}
      <section className="product-grid">
        {plantData.map((section) => (
          <div key={section.category} className="col-span-12">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              {section.category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.plants.map((plant) => (
                <div key={plant.id} className="product-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="price">$ {plant.cost}</p>
                  <button
                    className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={addedIds.includes(plant.id)}
                    onClick={() => handleAdd(plant)}
                  >
                    {addedIds.includes(plant.id) ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
