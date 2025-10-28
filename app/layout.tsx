import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
                <Header />

        {children}
      </body>
    </html>
  );
}
