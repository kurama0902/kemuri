"use client";

import { Header } from "./components/Header";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <title>kemuri</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html >
  );
}
