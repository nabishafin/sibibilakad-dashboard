import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sideLogo from "../assets/Frame 2147229686.png"
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/slices/authSlice";

const LoginSection = () => {
  const [formData, setFormData] = useState({
    identifier: "", // keeping identifier as per your existing code, assuming backend handles email/username
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend likely expects 'email' or 'username'. If backend accepts 'identifier', keep it. 
      // Adapting to standard 'email' if identifier looks like one, or passing as is if backend supports it.
      // Assuming backend takes { email, password } based on typical setups, or { identifier, password }.
      // Let's pass it as 'email' if the field name in backend is email, but here we use formData as is.
      // Checking authApi.js, it passes `loginData` directly. 
      // Let's assume backend expects 'email' and 'password'. 
      // If the user input 'identifier' is meant to be mapped to 'email':
      const loginData = {
        usernameOrEmail: formData.identifier,
        password: formData.password
      };

      const res = await login(loginData).unwrap();

      // Based on user provided structure:
      // {
      //     "code": 200,
      //     "success": true,
      //     "message": "Login successful",
      //     "data": {
      //         "accessToken": "...",
      //         "refreshToken": "...",
      //         "user": { ... }
      //     }
      // }

      const { accessToken, refreshToken, user } = res.data || {};

      if (accessToken) {
        dispatch(setLogin({ user, token: accessToken, refreshToken }));
        localStorage.setItem("token", accessToken);
        if (user) localStorage.setItem("user", JSON.stringify(user));
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
        navigate("/dashboard");
      } else {
        setError("Login failed: No access token received.");
      }

    } catch (err) {
      console.error("Login failed", err);
      setError(err?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#0f172a] text-white font-sans">
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 md:px-24 lg:px-32 bg-[#1e293b]">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-semibold mb-2">Login to your account</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <p className="text-gray-400 mb-8">
            Don't have an account?{" "}
            <Link to={"/register"}>
              <span className="text-yellow-500 cursor-pointer hover:underline">
                Register
              </span>
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username or Email
              </label>
              <input
                type="text"
                name="identifier"
                placeholder="Username or Email"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-11 text-gray-500 hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex justify-start">
              <Link to={"/recover-account"}>
                <span className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                  Forgot Password?
                </span>
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-md hover:from-yellow-500 hover:to-yellow-700 transform active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Play Now"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1e293b] text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button className="flex items-center justify-center w-1/3 mx-auto py-2 bg-[#2d3748] rounded-md hover:bg-[#3d4859] transition-colors border border-gray-600">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm">Google</span>
          </button>
        </div>
      </div>

      {/* Right Section - Branding */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-[#0a101d]">
        <div className="flex items-center space-x-4">
          {/* Logo Placeholder */}
          <img src={sideLogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
