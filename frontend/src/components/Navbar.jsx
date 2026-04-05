import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-yellow-400">
      <h1 className="font-bold text-lg">🥭 Mango Shop</h1>

      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;