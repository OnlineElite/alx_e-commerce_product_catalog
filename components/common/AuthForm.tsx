import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/common/Button";
import { X, LoaderCircle } from "lucide-react";
import { AuthFormProps, RegisterCredentials, LoginCredentials } from "@/interfaces";
import { registerUser, loginUser, clearError } from "@/store/slices/authSlice";
import type { RootState, AppDispatch } from "@/store/index"
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary"
import AuthFormErrorFallback from  "@/components/errorBoundary/AuthFormErrorFallback";

const AuthForm: React.FC<AuthFormProps> = ({ handleClose, mode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setPasswordError("");
    setUsernameError("");
    
    // Validate password confirmation for register mode
    if (mode === "register" && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (mode === "register") {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setUsernameError("Username can only contain letters, numbers, and underscores");
      return;
    }
    
    // Optional: Add additional username validation rules
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      return;
    }
    
    if (username.length > 20) {
      setUsernameError("Username must be less than 20 characters");
      return;
    }
  }

    if (mode === "register") {
      const credentials: RegisterCredentials = {
        username: username,
        email,
        password,
        passwordConfirm: confirmPassword,
        acceptTerms,
      };
      dispatch(registerUser(credentials));
    } else {
      const credentials: LoginCredentials = { email, password };
      dispatch(loginUser(credentials));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (passwordError && password === e.target.value) {
      setPasswordError("");
    }
  };

  // Clear username error when user starts typing
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (usernameError) {
      setUsernameError("");
    }
  };


  if(loading) 
  return (
    <div className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-white/30 z-150">
      <p className="z-100 absolute text-black flex item-center justify-center"><LoaderCircle size={35} className="text-mainColor animate-spin"/></p>
    </div>
  )

  return (
    <ErrorBoundary fallback={AuthFormErrorFallback}>
      <form onSubmit={handleSubmit} className="relative rounded-lg bg-white p-6">
        <span className="absolute top-2 right-2 text-gray-500 cursor-pointer" onClick={handleClose}>
          <X size={20} />
        </span>

        <div className="flex flex-col items-center justify-center my-3">
          <h3 className="font-bold text-2xl">
            {mode === "register" ? "Create an Account" : "Login to Your Account"}
          </h3>
          <p>
            {mode === "register"
              ? "Join us today! Fill in your details to get started"
              : "Welcome back! Please log in to continue"}
          </p>
        </div>

        <div className="flex flex-col justify-between w-full gap-5 mt-4">
          {mode === "register" && (
            <div className="w-full flex flex-col justify-between gap-1">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter your username"
                className={`placeholder:text-gray-400 text-sm rounded p-2 border ${
                  usernameError ? "border-red-500" : "border-gray-500/20"
                }`}
                required
              />
            </div>
          )}

          <div className="w-full flex flex-col justify-between gap-1">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="placeholder:text-gray-400 text-sm rounded p-2 border border-gray-500/20"
              required
            />
          </div>

          <div className="w-full flex flex-col justify-between gap-1">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === "register" ? "Create a password" : "Enter your password"}
              className="placeholder:text-gray-400 text-sm rounded p-2 border border-gray-500/20"
              required
            />
          </div>

          {mode === "register" && (
            <>
              <div className="w-full flex flex-col justify-between gap-1">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm your password"
                  className={`placeholder:text-gray-400 text-sm rounded p-2 border ${
                    passwordError ? "border-red-500" : "border-gray-500/20"
                  }`}
                  required
                />
              </div>

              <div className="w-full flex flex-row gap-1 items-center">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <label className="text-sm text-gray-700">
                  I agree to the Terms & Conditions
                </label>
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            
            backColor="secondColor"
            title={mode === "register" ? "Create Account" : "Login"}
          />

          <div className="flex flex-row items-center justify-center gap-1">
            {mode === "register" ? (
              <>
                <span className="text-gray-400 text-sm">Already have an account?</span>
                <span
                  className="text-mainColor font-bold cursor-pointer"
                  onClick={() => dispatch(clearError())}
                >
                  Login
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-400 text-sm">Don’t have an account?</span>
                <span
                  className="text-mainColor font-bold cursor-pointer"
                  onClick={() => dispatch(clearError())}
                >
                  Register
                </span>
              </>
            )}
          </div>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default AuthForm;
