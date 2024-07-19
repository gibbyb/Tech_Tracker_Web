import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import { SessionProvider } from "next-auth/react";
import Sign_Out from "~/components/auth/Sign_Out";

import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Tech Tracker",
  description: "App used by COG IT employees to update their status throughout the day.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable)}
      >
        <SessionProvider>
          <div className="absolute top-4 right-6">
            <Sign_Out />
          </div>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
