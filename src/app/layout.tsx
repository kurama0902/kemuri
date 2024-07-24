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
      <body id="top">
        <Header />
        {children}
      </body>
    </html >
  );
}
