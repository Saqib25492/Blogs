'use client';

import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function ClientLayoutWrapper({ children }) {
  const { loading } = useSelector((state) => state.auth);
  const AuthLoading = () => {
  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900" />
    </motion.div>
  );
};


  if (loading) {
    return <AuthLoading />;
  }

  return <>{children}</>;
}
