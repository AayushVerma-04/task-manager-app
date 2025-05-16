import { useState } from "react";
import useAuthContext from "./UseAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const nav = useNavigate();

  const signup = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const resp = await axios.post("http://localhost:5555/api/user/signup", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(resp.data));
      dispatch({ type: "LOGIN", payload: resp.data });
      // console.log(resp.data);
      setLoading(false);
      nav('/tasks');
      
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return {signup, loading, error};
};

export default useSignup;
