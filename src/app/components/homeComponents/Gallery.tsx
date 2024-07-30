"use client"

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import s from './gallery.module.css';

// import required modules
import { EffectCards } from 'swiper/modules';

export function Gallery() {
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className={s.swiper}
      >
        <SwiperSlide className={s.slide}></SwiperSlide>
        <SwiperSlide className={s.slide}></SwiperSlide>
        <SwiperSlide className={s.slide}></SwiperSlide>
        <SwiperSlide className={s.slide}></SwiperSlide>
        <SwiperSlide className={s.slide}></SwiperSlide>
        <SwiperSlide className={s.slide}></SwiperSlide>
      </Swiper>
    </>
  );
}