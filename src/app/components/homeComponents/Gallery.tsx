"use client";

import React, { useCallback, useEffect, useState } from "react";

import "./gallery.css";

import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";


export default function Gallery() {

  const [z, setZ] = useState<number>(500);

  const carousel = useCallback<KeenSliderPlugin>(
    (slider) => {
      let k = z;
      function rotate() {
        const deg = 360 * slider.track.details.progress;
        slider.container.style.transform = `translateZ(-${k}px) rotateY(${-deg}deg)`;
      }
      slider.on("created", () => {
        const deg = 360 / slider.slides.length;
        slider.slides.forEach((element, idx) => {
          element.style.transform = `rotateY(${deg * idx}deg) translateZ(${k}px)`;
        });
        rotate();
      });
      slider.on("detailsChanged", rotate);
    },
    [z] // Dependency array to update the function when z changes
  );

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
      dragSpeed: 0.3,
    },
    [carousel]
  );

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      
      if(window.innerWidth > 920) {
        document.querySelectorAll<HTMLElement>('.carousel__cell').forEach((el, idx) => {
          const deg = 360 / 6;
          el.style.transform = `rotateY(${deg * idx}deg) translateZ(${500}px)`;
        });
      }

      if(window.innerWidth <= 920 && window.innerWidth > 720) {
        document.querySelectorAll<HTMLElement>('.carousel__cell').forEach((el, idx) => {
          const deg = 360 / 6;
          el.style.transform = `rotateY(${deg * idx}deg) translateZ(${400}px)`;
        });
      }

      if(window.innerWidth <= 720) {
        document.querySelectorAll<HTMLElement>('.carousel__cell').forEach((el, idx) => {
          const deg = 360 / 6;
          el.style.transform = `rotateY(${deg * idx}deg) translateZ(${200}px)`;
        });
      }

    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
    <div className="wrapper">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
          <div className="carousel__cell number-slide1 "></div>
          <div className="carousel__cell number-slide2"></div>
          <div className="carousel__cell number-slide3"></div>
          <div className="carousel__cell number-slide4"></div>
          <div className="carousel__cell number-slide5"></div>
          <div className="carousel__cell number-slide6"></div>
        </div>
      </div>
    </div>
  );
}