import { FaMapMarkerAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#1f2a44] text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">

        {/* 🔹 Logo + About */}
        <div>
          <h1 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            🥭 OurMangoFarm
          </h1>
          <p className="mt-3 text-sm text-gray-300">
            Premium quality mangoes delivered straight from
            the orchard to your doorstep.
          </p>
        </div>

        {/* 🔹 Our Mangoes */}
        <div>
          <h2 className="font-semibold mb-3">OUR MANGOES</h2>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>Banganapalli Mango</li>
            <li>Alphonso Mango</li>
            <li>Himam Pasand</li>
            <li>Rassalu</li>
          </ul>
        </div>

        {/* 🔹 Policies */}
        <div>
          <h2 className="font-semibold mb-3">POLICIES</h2>
          <ul className="text-sm text-gray-300 space-y-2">
            <li className="hover:text-yellow-400 cursor-pointer" >Shipping Policy</li>
            <li className="hover:text-yellow-400 cursor-pointer">Refund & Return Policy</li>
            <li className="hover:text-yellow-400 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-yellow-400 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* 🔹 Contact */}
        <div>
          <h2 className="font-semibold mb-3">CONTACT US</h2>
          <ul className="text-sm text-gray-300 space-y-3">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> Hyderabad, Telangana
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> hello@OurMangoFarm.com
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp /> WhatsApp Us
            </li>
          </ul>
        </div>
      </div>

      {/* 🔻 Bottom */}
      <div className="border-t border-gray-600 text-center py-4 text-sm text-gray-400">
        © 2026 OurMangoFarm. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;