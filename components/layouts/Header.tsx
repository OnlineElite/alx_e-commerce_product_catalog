import { ShoppingCart, ShoppingBag, Search } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-violet-700 to-blue-600 shadow-md sticky top-0  px-2 py-4">
      <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-4 px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <ShoppingBag className="text-white" />
          <span className="text-white font-extrabold text-xl md:text-2xl">
            ShopSphere
          </span>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between w-full gap-4">
          {/* Actions section */}
          <div className="flex flex-col sm:flex-col md:flex-row items-center justify-between gap-2 order-1 md:order-2 sm:order-2 w-full md:w-auto">
            <div className="flex flex-row items-center w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="rounded-l py-2 w-full placeholder-gray-500 px-2 text-sm focus:outline-none"
              />
              <div className="bg-registerButton rounded-r px-2 py-2">
                <Search className="text-white w-5 h-auto"/>
              </div>
              <div className="relative mx-4">
                <ShoppingCart className="text-white" />
                <span className="bg-registerButton absolute -top-2 left-3 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white">
                  0
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-2">
              <button className="text-white px-4 border border-white rounded  py-1">Login</button>
              <button className="text-white px-4 bg-registerButton rounded  py-1">Register</button>
            </div>
          </div>
          {/* Navigation bar */}
          <div className="mx-auto order-2 md:order-2 lg:order-1 w-full md:w-auto">
            <ul className="flex flex-row gap-4 items-center justify-center text-sm text-white font-bold ">
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded ">Home</li>
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded ">Products</li>
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded ">Categories</li>
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded ">Deals</li>
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded ">About</li>
            </ul>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
