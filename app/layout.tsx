import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import "../styles/globals.css";


import NavbarWrapper from "./NavbarWrapper";

export const metadata: Metadata = {
  title: "FluentAI",
  description: "Your Personalized AI English Tutor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add your meta tags or additional head elements here */}
      </head>
      <body>
        <UserProvider>
          <NavbarWrapper/>
            {/* The children will render here */}
            {children}

        </UserProvider>
      </body>
    </html>
  );
}
