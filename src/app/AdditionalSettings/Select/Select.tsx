import { useState } from 'react';

import s from './select.module.css'

export const Select = ({ text }: { text: string }) => {

    const [isShowSelect, setIsShowSelect] = useState<boolean>(false);

    const handleShowingSelect = () => {
        setIsShowSelect(prev => {
            return !prev
        })
    }

    return (
        <div className={s.wrap}>
            <p className={s.text}>Sampling Method</p>
            <div onClick={handleShowingSelect} className={`${s.closeBG} ${isShowSelect && s.show}`}></div>
            <div className={s.selectWrap}>
                <button onClick={handleShowingSelect} className={s.select}>
                    Choose
                </button>
                <div className={`${s.options} ${isShowSelect && s.show}`}>

                </div>
            </div>
        </div>
    )
}