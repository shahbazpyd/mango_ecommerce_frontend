import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow bg-white">
      
      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-green-600 cursor-pointer"
      >
        🥭 MangoMe
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        
        {/* CART */}
        <button
          onClick={() => navigate("/cart")}
          className="text-xl"
        >
          🛒
        </button>

        {/* AUTH */}
        {!isLoggedIn ? (
          <>
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