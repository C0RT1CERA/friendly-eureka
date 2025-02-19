import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Navbar1 from "./(cascadian)/Navbar1";
import Navbar2 from "./(cascadian)/Navbar2";
import Navbar3 from "./(cascadian)/Navbar3";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "revmedsync",
  description: "A RCMS Medical Billing and Software Services.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar1 />  */}
        {/* <Navbar2/> */}
        <Navbar3/>
        {children}
      </body>
    </html>
  );
}
