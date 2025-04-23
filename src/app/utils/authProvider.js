'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '@/redux/slices/authSlice';
import { checkUserAuthentication } from '@/app/utils/auth'; // Adjust path if needed

const ClientWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verify = async () => {
      const { user } = await checkUserAuthentication();
      console.log("User from authProvider:", user); // Log the user data for debugging
      if (user) {
        dispatch(login({ user }));
      } else {
        dispatch(logout());
      }
    };

    verify();
  }, [dispatch]);

  return null;
};

export default ClientWrapper;
