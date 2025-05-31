import "./globals.css";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import NavBar from "@/components/UI/Home/Nav";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "coinbase checkout blinks",
  description: "coinbase checkout blinks on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
