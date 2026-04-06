import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <Footer /> {/* ✅ Always at bottom */}
      </div>
    </>
  );
}

export default App;
