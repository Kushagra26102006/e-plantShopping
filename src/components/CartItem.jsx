import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../store/CartSlice";
import { FaShoppingCart } from "react-icons/fa";

export default function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const grandTotal = items.reduce((sum, i) => sum + i.cost * i.quantity, 0);

  const inc = (id) => {
    const item = items.find((i) => i.id === id);
    dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
  };
  const dec = (id) => {
    const item = items.find((i) => i.id === id);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(id));
    }
  };
  const del = (id) => dispatch(removeItem(id));

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
        <div className="flex items-center space-x-2">
          <FaShoppingCart size={20} onClick={() => onNavigate("cart")} />
          <span>{items.length}</span>
        </div>
      </nav>

      {/* ---------- Cart List ---------- */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          Your Shopping Cart
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="details">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Unit: $ {item.cost}</p>
                  <p className="text-sm text-gray-800">
                    Subtotal: $ {item.cost * item.quantity}
                  </p>
                </div>

                <div className="qty-controls flex items-center space-x-1">
                  <button onClick={() => dec(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => inc(item.id)}>+</button>
                </div>

                <button className="delete-btn" onClick={() => del(item.id)}>
                  Delete
                </button>
              </div>
            ))}

            {/* Grand Total */}
            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">
                Grand Total: $ {grandTotal.toFixed(2)}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-4 flex justify-between">
              <button className="btn-primary" onClick={() => onNavigate("products")}>
                Continue Shopping
              </button>
              <button
                className="btn-primary"
                style={{ backgroundColor: "#4f46e5" }}
                onClick={() => alert("Checkout – Coming Soon!")}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
