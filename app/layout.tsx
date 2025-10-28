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
        <main>
          <img src="/logo2.jpg" alt="GKI Store Logo" width={200} height={40} style={{ display: 'block', margin: '0 auto' }} />
        </main>

        {children}
      </body>
    </html>
  );
}
