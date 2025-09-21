import { ShoppingCart, ShoppingBag } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-violet-700 to-blue-600 shadow-md sticky top-0 p-4 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto w-full gap-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <ShoppingBag className="text-white" />
          <span className="text-white font-extrabold text-xl md:text-2xl">
            ShopSphere
          </span>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for products..."
          className="rounded-3xl px-4 py-2 w-full md:w-1/2 placeholder-gray-500"
        />

        {/* Cart */}
        <div className="flex flex-row relative">
          <ShoppingCart className="text-white" />
          <span className="bg-red-500 absolute -top-2 left-3 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white">
            0
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
