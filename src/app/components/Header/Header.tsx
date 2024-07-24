import Image from 'next/image';

import s from './header.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = () => {
    const [isHidden, setIsHidden] = useState<boolean>(false);
    const [scrollPos, setScrollPos] = useState<number>(0);

    // console.log(scrollPos, 'prev');

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
        <header className={`${s.headerWrap} ${isHidden ? s.hidden : ''}`}>
            <Link href='/home'>
                <Image className={s.logo} src='/logo.jpg' width={60} height={60} alt='logo' />
            </Link>
            <nav className={s.nav}>
                <Link className={s.navLink} href='/home'>Home</Link>
                <Link className={s.navLink} href='/generate'>playground</Link>
                <Link className={s.navLink} href='/login'>login</Link>
            </nav>
        </header>
    )
}