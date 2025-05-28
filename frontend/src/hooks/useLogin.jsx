import React, { useState } from 'react'
import useAuthContext from './useAuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();
    const nav = useNavigate();

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await axios.post('http://localhost:5555/api/user/login', {email, password})

            localStorage.setItem("user", JSON.stringify(result.data));
            dispatch({type: 'LOGIN', payload: result.data});

            setIsLoading(false);
            nav('/tasks');
        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.message);
        }
    }

    return {login, isLoading, error};
}

export default useLogin