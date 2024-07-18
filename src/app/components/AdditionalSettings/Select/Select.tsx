import { ChangeEvent, useState } from 'react';

import Image from 'next/image';

import s from './select.module.css'

export const Select = ({ text, vae, handleSetVae, samplingMethod, handleSetSamplingMethod, upscaleMethod, handleSetUpscaleMethod, selectedLoras, selectLoras, loraWeights, handleSetLoraWeights }: {
    text: string,
    vae?: string,
    handleSetVae?: (vae: string) => void,
    samplingMethod?: string,
    handleSetSamplingMethod?: (method: string) => void,
    upscaleMethod?: string,
    handleSetUpscaleMethod?: (method: string) => void,
    selectedLoras?: {
        loras: string[];
        version: string;
    },
    selectLoras?: ({ lora, version }: { lora: string, version: string }) => void,
    loraWeights?: { [key: string]: number },
    handleSetLoraWeights?: (e: ChangeEvent<HTMLInputElement>, loraName: string) => void
}) => {

    const [isShowSelect, setIsShowSelect] = useState<boolean | null>(null);

    const methods: string[] = ['Euler a', 'Euler', 'LMS', 'Heun', 'DPM2', 'DPM2 a', 'DPM++ 2S a', 'DPM++ 2M', 'DPM++ SDE', 'DPM++ 2M SDE', 'DPM fast', 'LMS Karras', 'DPM2 a Karras', 'DPM++ 2S a Karras', 'DPM++ 2M Karras', 'DPM++ SDE Karras', 'DPM++ 2M SDE Karras'];
    const vaeMethods: string[] = ['Automatic', 'None', 'vae-ft-mse-840000-ena-pruned.ckpt', 'kl-f8-anime.ckpt', 'kl-f8-anime2.ckpt', 'YOZORA.vae.pt', 'orangemox.vae.pt', 'blessed2.vae.pt', 'animevae.pt', 'ClearVAE.safetensors', 'pastel-waifu-diffusion.vae.pt', 'cute_vae.safetensors', 'sdxl_vae.safetensors', 'sdxl-vae-fp16-fix.safetensors']
    const upscaleMethods: string[] = ['Latent', 'Latent (antialiased)', 'Latent (bicubic)', 'Latent (bicubic antialiased)', 'Latent (nearest)', 'Latent (nearest-exact)', 'None', 'Lanczos', 'Nearest', '4x-UltraSharp', '4x_foolhardy_Remacri', 'ESRGAN_4x', 'R-ESRGAN 4x+', 'R-ESRGAN 4x+ Anime6B', '4x_NMKD-Siax_200k', '4x-AnimeSharp', '4x_NMKD-Superscale-SP_178000_G', 'SwinIR_4x', '8x_NMKD-Superscale_150000_G']

    const handleShowingSelect = () => {
        setIsShowSelect(prev => {
            return !prev
        })
    }

    return (
        <div className={s.wrap}>
            <p className={s.text}>{text}</p>
            <div className={`${s.selectWrap}`}>
                <div className={`${s.btnWrap} ${isShowSelect && s.straightBorders}`}>
                    <button onClick={handleShowingSelect} className={`${s.select} ${isShowSelect && s.straightBorders}`}>
                        {((vae === '' || vae === undefined) && (samplingMethod === '' || samplingMethod === undefined) && (upscaleMethod === '' || upscaleMethod === undefined)) ? <span>Choose</span> : <span>{vae ? vae : samplingMethod ? samplingMethod : upscaleMethod}</span>}
                    </button>
                    {/* <div className={s.btnBG}></div> */}
                    <Image className={`${s.dropdown} ${isShowSelect && s.rotateDropdown}`} src='/dropdown.svg' width={25} height={25} alt='dropdown' />
                </div>
                <div className={`${s.options} ${isShowSelect === null ? '' : isShowSelect ? s.show : s.close}`}>
                    {text === 'Sampling Method' && methods.map((el, index) => {
                        return (
                            <button onClick={() => {
                                if (handleSetSamplingMethod !== undefined) {
                                    handleSetSamplingMethod(el);
                                }
                            }} className={`${s.selectBtn} ${samplingMethod === el && s.selectedBtn}`} key={index}>{el}</button>
                        )
                    })}

                    {text === 'VAE' && vaeMethods.map((el, index) => {
                        return (
                            <button onClick={() => {
                                if (handleSetVae !== undefined) {
                                    handleSetVae(el);
                                }
                            }} className={`${s.selectBtn} ${vae === el && s.selectedBtn}`} key={index}>{el}</button>
                        )
                    })}

                    {text === 'Upscaler' && upscaleMethods.map((el, index) => {
                        return (
                            <button onClick={() => {
                                if (handleSetUpscaleMethod !== undefined) {
                                    handleSetUpscaleMethod(el);
                                }
                            }} className={`${s.selectBtn} ${upscaleMethod === el && s.selectedBtn}`} key={index}>{el}</button>
                        )
                    })}

                    {(text === 'Lora Weight' && loraWeights !== undefined) && selectedLoras?.loras?.map((el, index)=> {
                        return (
                            <div key={el} className={`${s.weightSettings} ${text === 'Lora Weight' && s.bigPadding}`}>
                                <p className={s.loraName}>{el}</p>
                                <div className={s.inputsWrap}>
                                    <input onChange={(e) => handleSetLoraWeights !== undefined && handleSetLoraWeights(e, el)} value={loraWeights[`${el}`] ?? 0.8} className={s.rangeInput} type="range" min={0.1} max={1} step={.1} />
                                    <input onChange={(e) => handleSetLoraWeights !== undefined && handleSetLoraWeights(e, el)} value={loraWeights[`${el}`] ?? 0.8} className={s.numberInput} type="number" min={0.1} max={1} step={.1}  />
                                </div>
                                <button onClick={() => selectLoras !== undefined && selectLoras({lora: el, version: selectedLoras.version})} className={s.unselectLora}>
                                    delete
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}