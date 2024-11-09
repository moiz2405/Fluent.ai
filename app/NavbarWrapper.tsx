'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/common/Navbar'; // Corrected path

const NavbarWrapper: React.FC = () => {
  const [navHeight, setNavHeight] = useState<number>(0);

  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector<HTMLElement>('.navbar');
      if (navbar) {
        setNavHeight(navbar.offsetHeight);
      }
    };

    updateNavHeight(); // Set initial height

    // Update height on resize
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: `${navHeight}px` }}></div>
    </>
  );
};

export default NavbarWrapper;
