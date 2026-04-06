import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    API.get(`products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const addToCart = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }

  try {
    await API.post("cart/add/", {
      product_id: product.id,
      quantity_kg: qty,
    });

    alert("Added to cart 🛒");
  } catch (err) {
    console.log(err.response?.data);
  }
};

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 px-6 grid md:grid-cols-2 gap-8">

      {/* 🟡 LEFT - IMAGE */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-xl shadow"
        />
      </div>

      {/* 🟢 RIGHT - DETAILS */}
      <div>
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          ₹{product.price_per_kg} / kg
        </h2>

        <p className="mb-4">
          Stock: {product.stock > 0 ? "Available" : "Out of stock"}
        </p>

        {/* 🔢 Quantity */}
        <div className="flex items-center gap-3 mb-4">
          <span>Quantity (kg):</span>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="border p-2 w-20"
          />
        </div>

        {/* 🛒 Add to Cart */}
        <button
          onClick={addToCart}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;