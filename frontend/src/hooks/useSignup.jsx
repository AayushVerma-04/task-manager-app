import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const dispatch = useDispatch();

  const signup = async (username, email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await axios.post('http://localhost:5555/api/user/signup', {
        username,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(result.data));
      dispatch(setUser(result.data));

      setIsLoading(false);
      nav('/tasks');
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
