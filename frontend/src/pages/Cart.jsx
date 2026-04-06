import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const [cart, setCart] = useState(null);
    const { fetchCartCount } = useCart();
  const navigate = useNavigate();

  // Fetch cart
  const fetchCart = async () => {
    try {
      const res = await API.get("cart/");
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (id, qty) => {
    if (qty <= 0) return;

    await API.patch(`cart/update/${id}/`, {
      quantity_kg: qty,
    });

    fetchCart();
  };

  // Remove item
  const removeItem = async (id) => {
    await API.delete(`cart/remove/${id}/`);
    fetchCart();
    fetchCartCount();
  };

  // Clear cart
  const clearCart = async () => {
    await API.delete("cart/clear/");
    fetchCart();
    fetchCartCount();
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {cart.items.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          {/* 🟡 CART ITEMS */}
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.product_image || "https://via.placeholder.com/80"}
                    className="h-16 w-16 object-cover rounded"
                  />

                  <div>
                    <h2 className="font-semibold">{item.product_name}</h2>
                    <p className="text-sm text-gray-500">
                      ₹{item.price_per_kg}/kg
                    </p>
                  </div>
                </div>

                {/* MIDDLE - QUANTITY */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity_kg - 1)
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity_kg} kg</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity_kg + 1)
                    }
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="font-bold">₹{item.total_price}</p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 🟢 TOTAL + ACTIONS */}
          <div className="mt-6 bg-yellow-50 p-4 rounded-xl flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Total: ₹{cart.total_cart_price}
            </h2>

            <div className="space-x-3">
              <button
                onClick={clearCart}
                className="bg-red-400 px-4 py-2 rounded text-white"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-500 px-4 py-2 rounded text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
