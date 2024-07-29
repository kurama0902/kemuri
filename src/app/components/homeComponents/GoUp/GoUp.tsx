'use client'

import { useEffect, useState } from 'react';

import s from './goUp.module.css';

export const GoUp = () => {

    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [scrollPos, setScrollPos] = useState<number>(0);

    useEffect(() => {

        function onScroll() {
            const currentScroll = window.scrollY;

            if (currentScroll > scrollPos) {
                setIsHidden(true);
            } else if (currentScroll < scrollPos) {
                setIsHidden(false);
            }

            setScrollPos(currentScroll);

            return () => {
                window.removeEventListener("scroll", onScroll);
            };

        }

        window.addEventListener('scroll', onScroll);

    }, [scrollPos])

    return (
        <a href='#top' className={`${s.goUp} ${isHidden ? s.hidden : ''}`}>
            <svg width={30} height={30} data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" /></svg>
        </a>
    )
}