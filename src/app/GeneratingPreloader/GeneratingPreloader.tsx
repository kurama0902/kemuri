import Image from "next/image"

import s from "./gp.module.css"

export const GeneratingPreloader = () => {
    return (
        <div className={s.preloaderWrap}>
            <h1 className={s.text}>KEMURI</h1>
            <Image src="/generalLoading.svg" width={217} height={217} alt='Loading...' />
        </div>
    )
}