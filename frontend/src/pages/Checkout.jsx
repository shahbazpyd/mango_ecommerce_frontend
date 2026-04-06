import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const navigate = useNavigate();

  // Fetch cart
  useEffect(() => {
    API.get("cart/")
      .then((res) => setCart(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Place Order
  const placeOrder = async () => {
    try {
      await API.post("orders/create/", {
        address: form.address,
        city: form.city,
        pincode: form.pincode,
        phone: form.phone,
      });

      alert("Order placed successfully 🎉");

      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      alert("Order failed ❌");
    }
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6 grid md:grid-cols-2 gap-6">
      {/* 🟡 LEFT - FORM */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Delivery Details</h2>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <button
          onClick={placeOrder}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Place Order
        </button>
      </div>

      {/* 🟢 RIGHT - ORDER SUMMARY */}
      <div className="bg-yellow-50 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.product_name} ({item.quantity_kg}kg)
            </span>
            <span>₹{item.total_price}</span>
          </div>
        ))}

        <hr className="my-3" />

        <h3 className="font-bold text-lg">Total: ₹{cart.total_cart_price}</h3>
      </div>
    </div>
  );
}

export default Checkout;
