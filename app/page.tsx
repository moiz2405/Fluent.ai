import Image from "next/image";
import ChatBox from "@/components/home/chatbox";
import HeroSection from "@/components/home/herosection";


export default function Home() {
  return (
   <>

{/* <a href="/api/auth/login">Login</a><br />
<a href="/api/auth/logout">Logout</a> */}
    <HeroSection/>
    <ChatBox/>

   </>
  );
}
