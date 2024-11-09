"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ChatBox from "@/components/home/chatbox";
import HeroSection from "@/components/home/herosection";
// import Check from "@/components/home/check";
import LoadingScreen from "@/components/home/loadingScreen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (this can be replaced by actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show loading screen for 3 seconds (replace with your logic)

    // Clear timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Show the loading screen when isLoading is true
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <HeroSection />
      <ChatBox />
      {/* <Check/> */}
    </>
  );
}
