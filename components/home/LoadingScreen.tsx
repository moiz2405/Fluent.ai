import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center space-y-6"
      >
        {/* 3D Spinner with rotation and scale effect */}
        <motion.div
          className="relative w-24 h-24"
          initial={{ rotate: 0, scale: 1 }}
          animate={{ rotate: 360, scale: 1.1 }}
          transition={{ loop: Infinity, duration: 2, ease: 'linear' }}
        >
          <div className="absolute inset-0 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-b-transparent border-white rounded-full animate-spin-reverse"></div>
        </motion.div>

        {/* Stylish "Loading..." Text with animation */}
        <motion.span
          className="text-white text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Loading...
        </motion.span>
      </motion.div>

      {/* Subtle Hover Effect on the entire screen */}
      <motion.div
        className="absolute inset-0 bg-black opacity-20 hover:opacity-0 transition-opacity duration-300"
        initial={{ opacity: 0.1 }}
        whileHover={{ opacity: 0.3 }}
      />
    </div>
  );
};

export default LoadingScreen;
