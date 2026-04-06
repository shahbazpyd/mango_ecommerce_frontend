function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h2 className="mt-2 font-semibold text-lg">{product.name}</h2>

      <p className="text-gray-500 text-sm line-clamp-2">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-3">
        <span className="font-bold text-green-700">
          ₹{product.price_per_kg}/kg
        </span>

        <button
          onClick={() => addToCart(product.id)}
          className="bg-yellow-400 px-3 py-1 rounded-lg font-semibold hover:bg-yellow-500"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;