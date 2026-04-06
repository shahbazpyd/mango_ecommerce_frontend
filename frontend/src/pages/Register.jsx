import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("auth/register/", data);

      alert("Registered successfully ✅");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data); // 🔥 IMPORTANT (see actual error)
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        {/* USERNAME */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-green-500 py-2 rounded text-white">
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;