import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from "../api/axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Re-check token on route change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  // Fetch products for dropdown
  useEffect(() => {
    API.get("products/").then((res) => setProducts(res.data)).catch((err) => console.log(err));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 shadow bg-white">
      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-green-600 cursor-pointer"
      >
        🥭 OurMangoFarm
      </h1>

      {/* MANGOES DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Mangoes ▾
        </button>
        {showDropdown && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border rounded shadow-lg max-h-64 overflow-y-auto">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 border-b last:border-b-0"
              >
                {product.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* ✅ CART only if logged in */}
        {isLoggedIn && (
          <button onClick={() => navigate("/cart")} className="text-xl">
            🛒
          </button>
        )}
        {isLoggedIn && (
          <button
            onClick={() => navigate("/orders")}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            My Orders
          </button>
        )}
        {/* AUTH */}
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/about")}
              className="text-gray-700"
            >
              About
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
