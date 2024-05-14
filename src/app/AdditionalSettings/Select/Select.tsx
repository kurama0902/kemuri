import { useState } from 'react';

import s from './select.module.css'

export const Select = ({ text, vae, handleSetVae, samplingMethod, handleSetSamplingMethod }: { 
    text: string,
    vae?: string,
    handleSetVae?: (vae: string) => void,
    samplingMethod?: string,
    handleSetSamplingMethod?: (method: string) => void
}) => {

    const [isShowSelect, setIsShowSelect] = useState<boolean>(false);
    const methods: string[] = ['Euler a', 'Euler', 'LMS', 'Heun', 'DPM2', 'DPM2 a', 'DPM++ 2S a', 'DPM++ 2M', 'DPM++ SDE', 'DPM++ 2M SDE', 'DPM fast', 'LMS Karras', 'DPM2 a Karras', 'DPM++ 2S a Karras', 'DPM++ 2M Karras', 'DPM++ SDE Karras', 'DPM++ 2M SDE Karras'];
    const vaeMethods: string[] = ['Automatic', 'None', 'vae-ft-mse-840000-ena-pruned.ckpt', 'kl-f8-anime.ckpt', 'kl-f8-anime2.ckpt', 'YOZORA.vae.pt', 'orangemox.vae.pt', 'blessed2.vae.pt', 'animevae.pt', 'ClearVAE.safetensors', 'pastel-waifu-diffusion.vae.pt', 'cute_vae.safetensors', 'sdxl_vae.safetensors', 'sdxl-vae-fp16-fix.safetensors']

    const handleShowingSelect = () => {
        setIsShowSelect(prev => {
            return !prev
        })
    }    

    return (
        <div className={s.wrap}>
            <p className={s.text}>{text}</p>
            <div onClick={handleShowingSelect} className={`${s.closeBG} ${isShowSelect && s.show}`}></div>
            <div className={`${s.selectWrap} ${isShowSelect && s.selectWrapRelative }`}>
                <button onClick={handleShowingSelect} className={`${s.select}`}>
                    {((vae === '' || vae === undefined) && (samplingMethod === '' || samplingMethod === undefined)) ? 'Choose' : (vae ? vae : samplingMethod)}
                </button>
                <div className={`${s.options} ${isShowSelect && s.show}`}>
                    {text === 'Sampling Method' ? methods.map((el, index) => {
                        return (
                            <button onClick={() => {
                                if(handleSetSamplingMethod !== undefined) {
                                    handleSetSamplingMethod(el);
                                }
                            }} className={`${s.selectBtn} ${samplingMethod === el && s.selectedBtn}`} key={index}>{el}</button>
                        )
                    }) : vaeMethods.map((el, index) => {
                        return (
                            <button onClick={() => {
                                if(handleSetVae !== undefined) {
                                    handleSetVae(el);
                                }
                            }} className={`${s.selectBtn} ${vae === el && s.selectedBtn}`} key={index}>{el}</button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}