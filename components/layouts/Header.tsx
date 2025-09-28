import { ShoppingCart, ShoppingBag, Search, User as UserIcon } from "lucide-react";
import { useState, useEffect } from "react"
import AuthForm from "@/components/common/AuthForm"
import { RootState, AppDispatch } from "@/store/index"
import { useDispatch, useSelector } from "react-redux";
import { logout, checkAuth } from "@/store/slices/authSlice"
import { fetchCurrentUser, clearUser } from '@/store/slices/userSlice';
import { setSearchQuery } from "@/store/slices/filterSlice"


const Header: React.FC = () => {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user: authUser } = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.user);

  const { searchQuery } = useSelector((state: RootState) => state.filters)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  // Search implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearchQuery))
    }, 300)

    return () => clearTimeout(timer)
  }, [localSearchQuery, dispatch])

  // Check authentication status on component mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Fetch current user when authentication status changes
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
      setShowLoginForm(false);
      setShowRegisterForm(false);
    } else {
      // Clear user data when not authenticated
      dispatch(clearUser());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(clearUser());
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value)
  }

  // Get display name - prioritize user slice, fallback to auth user
  const getDisplayName = () => {
    if (user.username) return user.username;
    if (authUser?.username) return authUser.username;
    if (user.firstName || user.lastName) return `${user.firstName} ${user.lastName}`.trim();
    if (authUser?.firstName || authUser?.lastName) return `${authUser.firstName} ${authUser.lastName}`.trim();
    return 'User';
  }
  //console.log("display name header : ", getDisplayName)

  // Get initials for avatar
  const getInitials = () => {
    const name = getDisplayName();
    if (name === 'User') return 'U';
    
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  }

  //console.log("initial name header : ", getInitials)


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
                value={localSearchQuery}
                onChange={handleSearchChange}
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
            
            {isAuthenticated ? (
              <div className="flex flex-row gap-2 items-center">
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 flex items-center justify-center font-bold rounded-full bg-secondColor p-2 text-white text-lg">
                    {getInitials()}
                  </span>
                  <div className="hidden sm:block">
                    <p className="text-white text-lg">{getDisplayName()}</p>
                  </div>
                </div>
                <button 
                  className="text-white px-4 border border-white rounded py-1 hover:bg-white hover:text-mainColor transition-colors"
                  onClick={handleLogOut}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-row items-center justify-between gap-2">
                <button 
                  className="text-white px-4 border border-white rounded py-1 hover:bg-white hover:text-mainColor transition-colors"
                  onClick={() => setShowLoginForm(true)}
                >
                  Login
                </button>
                <button 
                  className="text-white px-4 bg-secondColor rounded py-1 hover:bg-secondColor/80 transition-colors"
                  onClick={() => setShowRegisterForm(true)}
                >
                  Register
                </button>
              </div>
            )}
          </div>
          
          {/* Navigation bar */}
          <div className="mx-auto order-2 md:order-2 lg:order-1 w-full md:w-auto">
            <ul className="flex flex-row gap-4 items-center justify-center text-sm text-white font-bold ">
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded cursor-pointer">Home</li>
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded cursor-pointer">Products</li>
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded cursor-pointer">Categories</li>
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded cursor-pointer">Deals</li>
              <li className="hover:bg-blue-300/20 py-1 px-2 rounded cursor-pointer">About</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Auth Modals */}
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
