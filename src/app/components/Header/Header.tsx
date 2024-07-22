import Image from 'next/image';

import s from './header.module.css';
import Link from 'next/link';

export const Header = () => {
    return (
        <header className={s.headerWrap}>
            <Link href='/'>
                <Image className={s.logo} src='/logo.jpg' width={60} height={60} alt='logo' />
            </Link>
            <nav className={s.nav}>
                <Link className={s.navLink} href='/'>Home</Link>
                <Link className={s.navLink} href='/generate'>playground</Link>
            </nav>
        </header>
    )
}