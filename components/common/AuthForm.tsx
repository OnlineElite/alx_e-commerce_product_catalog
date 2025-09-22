import Button from "@/components/common/Button"
import { X } from "lucide-react"
import { AuthFormProps } from "@/interfaces"

const AuthForm: React.FC<AuthFormProps> = ({ handleClose, mode }) => {

  const handleSubmit = () => {
    if (mode === "register") {
      console.log("Account created successfully")
    } else {
      console.log("Logged in successfully")
    }
  }

  return (
    <form className="relative rounded-lg bg-white p-6">
      <span className="absolute top-2 right-2 text-gray-500" onClick={handleClose}>
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
            <label className="font-">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="placeholder:text-gray-400 text-sm rounded p-2 border border-gray-500/20"
            />
          </div>
        )}

        <div className="w-full flex flex-col justify-between gap-1">
          <label className="font-">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="placeholder:text-gray-400 text-sm rounded p-2 border border-gray-500/20"
          />
        </div>

        <div className="w-full flex flex-col justify-between gap-1">
          <label className="font-">Password</label>
          <input
            type="password"
            placeholder={mode === "register" ? "Create a password" : "Enter your password"}
            className="placeholder:text-gray-400 text-sm rounded p-2 border border-gray-500/20"
          />
        </div>

        {mode === "register" && (
          <>
            <div className="w-full flex flex-col justify-between gap-1">
              <label className="font-">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="placeholder:text-gray-400 text-sm rounded p-2 border border-gray-500/20"
              />
            </div>

            <div className="w-full flex flex-row gap-1">
              <input type="checkbox" />
              <label className="text-sm text-gray-700">
                I agree to the Terms & Conditions
              </label>
            </div>
          </>
        )}

        <Button
          backColor="secondColor"
          title={mode === "register" ? "Create Account" : "Login"}
          action={handleSubmit}
        />

        <div className="flex flex-row items-center justify-center gap-1">
          {mode === "register" ? (
            <>
              <span className="text-gray-400 text-sm">Already have an account?</span>
              <span className="text-mainColor font-bold cursor-pointer" >Login</span>
            </>
          ) : (
            <>
              <span className="text-gray-400 text-sm">Don’t have an account?</span>
              <span className="text-mainColor font-bold cursor-pointer">Register</span>
            </>
          )}
        </div>
      </div>
    </form>
  )
}

export default AuthForm
