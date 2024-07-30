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
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+AT:ital,wght@0,100..400;1,100..400&display=swap" rel="stylesheet"></link>
        <title>Kemuri</title>
      </head>
      <body id="top">
        <Header />
        {children}
      </body>
    </html >
  );
}
