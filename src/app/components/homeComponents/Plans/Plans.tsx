'use client'

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import s from './plans.module.css';

// import required modules
import { EffectCoverflow, Keyboard, Mousewheel, Pagination } from 'swiper/modules';

export function Plans() {
    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[EffectCoverflow, Pagination, Mousewheel, Keyboard]}
                className={s.swiper}
            >
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Free</span>
                        <p className={s.modelsType}>General</p>
                        <p className={s.modelName}>Midjorney</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 1</p>
                        <p className={s.requestsPerDay}>Requests per day: 5</p>
                        <p className={s.modelName}>DALL-E-3</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 1</p>
                        <p className={s.requestsPerDay}>Requests per day: 15</p>
                        <p className={s.modelName}>Playdround-v2.5</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 1</p>
                        <p className={s.requestsPerDay}>Requests per day: 30</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Vip $5</span>
                        <p className={s.modelsType}>General</p>
                        <p className={s.modelName}>Midjorney</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 1</p>
                        <p className={s.requestsPerDay}>Requests per day: 30</p>
                        <p className={s.modelName}>DALL-E-3</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 1</p>
                        <p className={s.requestsPerDay}>Requests per day: 60</p>
                        <p className={s.modelName}>Playdround-v2.5</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 2</p>
                        <p className={s.requestsPerDay}>Requests per day: 75</p>
                        <p className={s.add}>Also includes free plans</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Premium $10</span>
                        <p className={s.modelsType}>General</p>
                        <p className={s.modelName}>Midjorney</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 2</p>
                        <p className={s.requestsPerDay}>Requests per day: 100</p>
                        <p className={s.modelName}>DALL-E-3</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 2</p>
                        <p className={s.requestsPerDay}>Requests per day: 120</p>
                        <p className={s.modelName}>Playdround-v2.5</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 2</p>
                        <p className={s.requestsPerDay}>Requests per day: 160</p>
                        <p className={s.add}>Also includes free plans</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Free</span>
                        <p className={s.modelsType}>SD</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 1</p>
                        <p className={s.requestsPerDay}>Requests per day: 75</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Vip $5</span>
                        <p className={s.modelsType}>SD</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 2</p>
                        <p className={s.requestsPerDay}>Requests per day: 700</p>
                        <p className={s.add}>Also includes free plans</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Premium $10</span>
                        <p className={s.modelsType}>SD</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 3</p>
                        <p className={s.requestsPerDay}>Requests per day: 1400</p>
                        <p className={s.add}>Also includes free plans</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Free</span>
                        <p className={s.modelsType}>SDXL</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 1</p>
                        <p className={s.requestsPerDay}>Requests per day: 70</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Vip $5</span>
                        <p className={s.modelsType}>SDXL</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 2</p>
                        <p className={s.requestsPerDay}>Requests per day: 650</p>
                        <p className={s.add}>Also includes free plans</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.slide}>
                    <div className={s.planWrap}>
                        <span className={s.planType}>Premium $10</span>
                        <p className={s.modelsType}>SDXL</p>
                        <p className={s.requestsPerMinute}>Requests per minute: 3</p>
                        <p className={s.requestsPerDay}>Requests per day: 1300</p>
                        <p className={s.add}>Also includes free plans</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
