import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import { AboutUs } from "./components/AboutUs";

function LandingPage({ onStart }) {
  return (
    <section className="landing-bg">
      <div className="card">
        <h1 className="text-3xl font-bold text-white mb-2">Paradise Nursery</h1>
        <p className="text-white mb-4">
          Bring home a piece of nature – curated houseplants for every space.
        </p>
        <button className="btn-primary" onClick={onStart}>
          Get Started
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const [view, setView] = useState("landing");

  const renderContent = () => {
    switch (view) {
      case "products":
        return <ProductList onNavigate={setView} />;
      case "cart":
        return <CartItem onNavigate={setView} />;
      default:
        return <LandingPage onStart={() => setView("products")} />;
    }
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">{renderContent()}</div>
      <footer>
        <AboutUs />
      </footer>
    </Provider>
  );
}
