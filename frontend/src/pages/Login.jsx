import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const nav = useNavigate();
  const { login, loading, error } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, pass);
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <form className="bg-white/20 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-none rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-white text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full px-4 py-2 border-none rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
            placeholder="Enter your password"
          />
        </div>

        <button 
          disabled={loading}
          className={`w-full bg-white text-blue-600 font-semibold py-2 rounded-xl shadow-lg transition-all duration-300 ${
            loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:scale-105 hover:bg-blue-200"
          }`}
          onClick={handleLogin}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <div className="text-center text-red-300 mt-4 min-h-[1.5rem]">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
