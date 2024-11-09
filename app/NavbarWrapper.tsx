'use client';

import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/common/Navbar'; // Corrected path

const NavbarWrapper: React.FC = () => {
  const [navHeight, setNavHeight] = useState<number>(0);
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.offsetHeight);
      }
    };

    updateNavHeight(); // Set initial height

    // Update height on resize
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  return (
    <>
      {/* Pass the ref to the Navbar */}
      <Navbar  />

      {/* Apply paddingTop dynamically based on navbar height */}
      <div style={{ paddingTop: `${navHeight}px` }}></div>
    </>
  );
};

export default NavbarWrapper;
