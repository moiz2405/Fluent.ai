import { ReactNode } from "react"; // Add this import to handle children type
import { UserProvider } from "@auth0/nextjs-auth0/client";
import NavbarWrapper from "./NavbarWrapper";
import "../styles/globals.css";

export const metadata = {
  title: "FluentAI",
  description: "Your Personalized AI English Tutor",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;  // Ensure children is typed correctly
}) {
  return (
    <html lang="en">
      <head>
        {/* Add your meta tags or additional head elements here */}
      </head>
      <body>
        <UserProvider>
          <NavbarWrapper>{children}</NavbarWrapper>  {/* Pass children here */}
        </UserProvider>
      </body>
    </html>
  );
}
