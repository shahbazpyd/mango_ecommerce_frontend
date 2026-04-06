import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("token/", {
        email: email,      // ✅ if backend supports email
        password: password,
      });

      // Save tokens
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // 🔥 Handle pending cart
      const pending = localStorage.getItem("pending_cart");

      if (pending) {
        const data = JSON.parse(pending);

        await API.post("cart/add/", {
          product_id: data.product_id,
          quantity_kg: data.quantity_kg,
        });

        localStorage.removeItem("pending_cart");
      }

      navigate("/",  { replace: true });
    } catch (err) {
      console.log(err.response?.data);

      alert("Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-yellow-400 py-2 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;