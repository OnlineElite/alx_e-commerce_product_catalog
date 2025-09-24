import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@/components/common/Button";
import { X } from "lucide-react";
import { AuthFormProps, RegisterCredentials, LoginCredentials } from "@/interfaces";
import { registerUser, loginUser, clearError } from "@/store/slices/authSlice";
import type { RootState, AppDispatch } from "@/store/index"

const AuthForm: React.FC<AuthFormProps> = ({ handleClose, mode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register") {
      const credentials: RegisterCredentials = {
        username: fullName,
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

  if(loading) return <p>Loading</p>

  return (
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
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="placeholder:text-gray-400 text-sm rounded p-2 border border-gray-500/20"
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
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="placeholder:text-gray-400 text-sm rounded p-2 border border-gray-500/20"
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
  );
};

export default AuthForm;
