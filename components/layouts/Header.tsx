import { ShoppingCart, ShoppingBag, Search } from "lucide-react";
import { useState, useEffect } from "react"
import AuthForm from "@/components/common/AuthForm"
import { RootState, AppDispatch } from "@/store/index"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice"
import { fetchCurrentUser } from '@/store/slices/userSlice';

const Header: React.FC = () => {

  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      setShowLoginForm(false);
      setShowRegisterForm(false);
    }
  }, [isAuthenticated]);

  const handleLogOut = () => {
    dispatch(logout())
    console.log("new status : ", isAuthenticated)
  }


  return (
    <header className="bg-mainColor shadow-md sticky top-0  px-2 py-4 z-50">
      <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full gap-4 px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <ShoppingBag className="text-secondColor" />
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
              <div className="bg-secondColor rounded-r px-2 py-2">
                <Search className="text-white w-5 h-auto"/>
              </div>
              <div className="relative mx-4">
                <ShoppingCart className="text-white" />
                <span className="bg-secondColor absolute -top-2 left-3 w-5 h-5 rounded-full text-center text-xs text-white">
                  0
                </span>
              </div>
            </div>
            {isAuthenticated? <div>
              {/* <button className="text-white px-4 border border-white rounded  py-1" onClick={handleLogOut} >Login Out</button> */}
              <div className="flex flex-row gap-2">
                <span className=" w-10 h-10 flex items-center justify-center font-bold rounded-full bg-secondColor p-2  text-white text-lg"> JB </span>
                <select className="bg-transparent  p-2">
                  <option value="">
                    welcome {user.username}
                  </option>
                  <option value="">
                    <button className="text-white px-4 border border-white rounded  py-1" onClick={handleLogOut} >Login Out</button>
                  </option>
                </select>
              </div> 
            </div>
            
            : <div className="flex flex-row items-center justify-between gap-2">
              <button className="text-white px-4 border border-white rounded  py-1" onClick={()=> setShowLoginForm(true)}>Login</button>
              <button className="text-white px-4 bg-secondColor rounded  py-1" onClick={()=> setShowRegisterForm(true)}>Register</button>
            </div> 
            }
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
      {showRegisterForm && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-black/50 z-100">
          <AuthForm handleClose={() => setShowRegisterForm(false)} mode="register" />
        </div>
      )}
      {showLoginForm && (
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-black/50 z-100">
          <AuthForm handleClose={() => setShowLoginForm(false)} mode="login" />
        </div>
      )}
    </header>
  );
};

export default Header;
