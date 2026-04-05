import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
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
        })
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

      alert("Added to cart ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      {/* HERO */}
      <div className="bg-yellow-100 rounded-xl p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Fresh Mangoes From Our Farm
          </h1>
          <p className="text-gray-600 mt-2">
            Buy premium mangoes directly from farmers 🍋
          </p>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/590/590685.png"
          className="h-28"
        />
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