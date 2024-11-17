"use client";
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/common/Navbar';

interface NavbarWrapperProps {
  children: React.ReactNode; // Declare children as a required prop
}

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ children }) => {
  const [navHeight, setNavHeight] = useState<number>(0);
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.offsetHeight);
      }
    };

    updateNavHeight(); // Set initial height
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar with a ref */}
      <Navbar ref={navbarRef} />

      {/* Content wrapper that will take the remaining space */}
      <div style={{ flex: 1, paddingTop: `${navHeight}px`, overflowY: 'auto' }}>
        {/* Main content will now start below the navbar */}
        {children}
      </div>
    </div>
  );
};

export default NavbarWrapper;
