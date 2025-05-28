import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await axios.post('http://localhost:5555/api/user/login', {
        email,
        password,
      });

      localStorage.setItem('user', JSON.stringify(result.data));
      dispatch(setUser(result.data)); // ✅ directly using the reducer

      setIsLoading(false);
      nav('/tasks');
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
