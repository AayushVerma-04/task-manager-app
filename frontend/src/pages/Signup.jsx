import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { signup, loading, error } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(email, pass);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <form
        onSubmit={handleSignup}
        className="bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Sign Up
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-none rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-white text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-4 py-2 border-none rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          disabled={loading}
          className={`w-full bg-white text-blue-600 font-semibold py-2 rounded-xl shadow-lg transition-all duration-300 ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:scale-105 hover:bg-blue-200"
          }`}
          onClick={handleSignup}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {error && (
          <div className="text-center text-red-300 mt-4 min-h-[1.5rem]">{error}</div>
        )}
      </form>
    </div>
  );
};

export default Signup;
