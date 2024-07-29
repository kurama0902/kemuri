import Image from 'next/image'
import s from './not-found.module.css'

export default function NotFound() {
    return (
        <div className={s.notFoundWrap}>
            <Image className={s.gif} src='/404.gif' width={400} height={400} alt='' />
            <h1 className={s.text}>Page is not found..</h1>
        </div>
    )
  }