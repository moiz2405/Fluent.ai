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
    <>
      {/* Navbar with a ref */}
      <Navbar ref={navbarRef} />

      {/* Wrapper div to add dynamic spacing */}
      <div style={{ paddingTop: `${navHeight}px` }}>
        {/* Main content will now start below the navbar */}
        {children}
      </div>
    </>
  );
};

export default NavbarWrapper;
