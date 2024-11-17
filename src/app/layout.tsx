// "use client";

import { Inter } from "next/font/google";

import ReduxProvider from "../components/ReduxProvider";
import "./globals.css";

import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next App",
  description: "Next.js starter app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <ReduxProvider>
            <Navbar />
            {children}{" "}
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
