"use client";

import React, { useRef, useEffect } from 'react';
import Navbar from '../components/common/Navbar';

interface NavbarWrapperProps {
  children: React.ReactNode;
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ children }) => {
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navbarRef.current) {
        // Do something with navbar height if needed
      }
    };

    updateNavHeight(); // Set initial height
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar with a ref */}
      <Navbar ref={navbarRef} />

      {/* Content wrapper that will take the remaining space */}
      <div className="flex-1 pt-16 overflow-y-auto">
        {/* Main content will now start below the navbar */}
        {children}
      </div>
    </div>
  );
};

export default NavbarWrapper;
