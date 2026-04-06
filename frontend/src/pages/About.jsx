function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* 🟡 HERO */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          About OurMangoFarm 🥭
        </h1>
        <p className="text-gray-600">
          Bringing farm-fresh mangoes directly to your doorstep
        </p>
      </div>

      {/* 🟢 STORY */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          OurMangoFarm started with a simple idea — deliver fresh, high-quality mangoes 
          directly from farmers to customers. We work closely with local orchards 
          to ensure every mango is naturally ripened, carefully packed, and delivered fresh.
        </p>
      </div>

      {/* 🔵 WHY US */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Why Choose Us</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-2">🌿 Farm Fresh</h3>
            <p className="text-sm text-gray-600">
              Directly sourced from orchards with no middlemen.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-2">🚚 Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Delivered quickly to maintain freshness and taste.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-bold mb-2">⭐ Premium Quality</h3>
            <p className="text-sm text-gray-600">
              Handpicked mangoes ensuring the best quality.
            </p>
          </div>

        </div>
      </div>

      {/* 🟣 MISSION */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-700">
          To make premium mangoes accessible to everyone while supporting local farmers 
          and promoting sustainable agriculture.
        </p>
      </div>

      {/* 🔻 CTA */}
      <div className="text-center mt-10">
        <h3 className="text-lg font-semibold mb-3">
          Taste the sweetness of real mangoes 🍋
        </h3>
        <button
          onClick={() => window.location.href = "/"}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Shop Now
        </button>
      </div>

    </div>
  );
}

export default About;