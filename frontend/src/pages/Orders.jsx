import { useEffect, useState } from "react";
import API from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("orders/")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet 😢</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-xl p-4 mb-4"
          >
            {/* 🔹 Order Info */}
            <div className="flex justify-between mb-2">
              <div>
                <p className="font-semibold">
                  Order #{order.id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">₹{order.total_price}</p>
                <span className="text-sm text-blue-500">
                  {order.status}
                </span>
              </div>
            </div>

            <hr className="my-2" />

            {/* 🔹 Items */}
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm mb-1"
              >
                <span>
                  {item.product_name || item.product} ({item.quantity_kg}kg)
                </span>
                <span>₹{item.price_per_kg}</span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;