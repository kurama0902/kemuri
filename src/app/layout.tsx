"use client";

import { useEffect, useRef } from "react";

import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const vantaRef = useRef(null);

  useEffect(() => {
    const threeScript = document.createElement('script');
    threeScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
    document.getElementsByTagName('head')[0].append(threeScript);

    FOG({
      el: vantaRef.current,
      THREE,
      highlightColor: 0x50203,
      midtoneColor: 0x40457,
      lowlightColor: 0x1a0c4a,
      baseColor: 0x6082a2,
      blurFactor: 0.51,
      zoom: 1.80
    });

    () => {
      if (threeScript) {
        threeScript.remove()
      }
    }
  }, [])

  return (
    <html lang="en">
      <body ref={vantaRef}>{children}</body>
    </html >
  );
}
