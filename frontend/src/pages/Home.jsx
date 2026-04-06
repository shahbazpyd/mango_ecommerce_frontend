import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { fetchCartCount } = useCart();
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    API.get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔥 Add to Cart with Auth Check
  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    // ❌ Not logged in
    if (!token) {
      localStorage.setItem(
        "pending_cart",
        JSON.stringify({
          product_id: productId,
          quantity_kg: 1,
        }),
      );

      navigate("/login");
      return;
    }

    // ✅ Logged in
    try {
      await API.post("cart/add/", {
        product_id: productId,
        quantity_kg: 1,
      });
      fetchCartCount();
      alert("Added to cart ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      {/* HERO */}
      <div className="bg-[#f7efe5] rounded-2xl p-10 md:p-16 flex flex-col">
        {/* TOP ROW: Left content + Right images */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
              Fresh Mangoes From Our Farm
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Handpicked Banginapalli, Alphonso & Himam Pasand mangoes —
              straight from sun-kissed orchards to your doorstep. Zero chemicals.
            </p>

            <button
              onClick={() =>
                window.scrollTo({ top: 500, behavior: "smooth" })
              }
              className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow"
            >
              Shop Now →
            </button>
          </div>

          {/* RIGHT IMAGES */}
          <div className="flex gap-4">
            <img src="https://img.icons8.com/color/96/mango.png" className="h-24" />
            <img src="https://img.icons8.com/color/96/mango.png" className="h-24" />
            <img src="https://img.icons8.com/color/96/mango.png" className="h-24" />
          </div>
        </div>

        {/* BOTTOM: FEATURES GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 mt-8 border rounded-xl overflow-hidden bg-white">
          <div className="flex flex-col items-center p-6 border">
            <span className="text-2xl">🌿</span>
            <p className="mt-2 font-medium">Fresh From Orchard</p>
          </div>

          <div className="flex flex-col items-center p-6 border">
            <span className="text-2xl">🛡️</span>
            <p className="mt-2 font-medium">No Pesticides</p>
          </div>

          <div className="flex flex-col items-center p-6 border">
            <span className="text-2xl">🌱</span>
            <p className="mt-2 font-medium">Bio Enzymes</p>
          </div>

          <div className="flex flex-col items-center p-6 border">
            <span className="text-2xl">🚚</span>
            <p className="mt-2 font-medium">Fast Delivery</p>
          </div>

          <div className="flex flex-col items-center p-6 border">
            <span className="text-2xl">💳</span>
            <p className="mt-2 font-medium">100% Secure Payment</p>
          </div>

          <div className="flex flex-col items-center p-6 border">
            <span className="text-2xl">⭐</span>
            <p className="mt-2 font-medium">Premium Quality</p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
