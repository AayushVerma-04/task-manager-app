import useAuthContext from './useAuthContext';

import { useDispatch } from 'react-redux';
import { resetUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(resetUser());
    nav('/login');
  };

  return { logout };
};

export default useLogout;
