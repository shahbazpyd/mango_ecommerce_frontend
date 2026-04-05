import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    API.get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Add to cart
  const addToCart = async (productId) => {
    try {
      await API.post("cart/add/", {
        product_id: productId,
        quantity_kg: 1,
      });
      alert("Added to cart");
    } catch (err) {
      alert("Login required");
    }
  };

  return (
    <div>
      {/* 🟡 HERO SECTION */}
      <div className="bg-yellow-100 rounded-xl p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            Fresh Mangoes From Our Farm
          </h1>
          <p className="text-gray-600 mt-2">
            Handpicked Banganapalli, Alphonso & Himam Pasand mangoes.
          </p>

          <button className="mt-4 bg-yellow-400 px-5 py-2 rounded-lg font-semibold">
            Shop Now →
          </button>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/590/590685.png"
          className="h-32"
        />
      </div>

      {/* 🟠 CATEGORY BAR */}
      <div className="flex gap-6 mt-6 justify-center text-sm font-medium">
        {["All", "Banganapalli", "Alphonso", "Himam", "Rassalu"].map(
          (cat, index) => (
            <button
              key={index}
              className="flex flex-col items-center text-gray-600 hover:text-yellow-500"
            >
              🥭
              <span>{cat}</span>
            </button>
          )
        )}
      </div>

      {/* 🟢 PRODUCT GRID */}
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