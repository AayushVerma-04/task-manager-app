// import React from 'react'
import useAuthContext from './UseAuthContext'
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const nav = useNavigate();

  const logout = ()=>{
    localStorage.removeItem('user');
    dispatch({type:'LOGOUT'});
    nav('/')
  }

  return {logout};
}