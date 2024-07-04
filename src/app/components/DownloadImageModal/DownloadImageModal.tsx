import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../../../context/ModalContext';

import fileDownload from 'js-file-download';

import s from './dowloadImageModal.module.css';

export const DownloadImageModal = ({ imageURL, selectLink, promptText }: { imageURL: string, mw: number, mn: number, selectLink: (link: string | null) => void, promptText: string }) => {

    const [isOpen, setIsOpen] = useState<boolean | null>(null);
    const [flag, setFlag] = useState<boolean | null>(null);

    const info = useContext(ModalContext);

    console.log(info);


    const handleSetOpen = () => {
        if (isOpen) {
            setIsOpen(false);
        } else if (isOpen === null) {
            setIsOpen(true)
        } else {
            setIsOpen(true);
        }
    }

    useEffect(() => {
        if (flag) {
            selectLink(null);
        }
    }, [flag])

    const handleDownload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        fileDownload(imageURL, 'image.png')
    }

    return (
        <div className={s.modalWrap}>
            <div onClick={() => setFlag(true)} className={s.closeBG}></div>
            <div style={{ maxWidth: `${info?.ratioWidth}px`, height: 'auto' }} className={s.imageWrap}>
                <button onClick={handleSetOpen} className={s.moreBtn}>
                    <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" id="Flat" viewBox="0 0 256 256">
                        <path fill="#ffffff" d="M160,128a32,32,0,1,1-32-32A32.03164,32.03164,0,0,1,160,128ZM48,96a32,32,0,1,0,32,32A32.03164,32.03164,0,0,0,48,96Zm160,0a32,32,0,1,0,32,32A32.03164,32.03164,0,0,0,208,96Z" />
                    </svg>
                </button>
                <img style={{ width: '100%' }} className={s.image} src={imageURL} alt="" />
            </div>
            <div className={`${s.descriptionWrap} ${isOpen ? s.show : isOpen === null ? '' : s.hide}`}>
                <button onClick={() => setIsOpen(false)} className={s.closeBtn}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                </button>
                <div className={`${s.description} ${s.mt}`}>
                    <p>Model name:</p>
                    <p>{info?.selectedModel?.modelName}</p>
                </div>
                <div className={`${s.description} ${s.mb}`}>
                    <p>Model type:</p>
                    <p>{info?.selectedModel?.category}</p>
                </div>
                {
                    (info?.selectedLoras?.loras !== undefined && info?.selectedLoras?.loras.length > 0) &&
                    <div className={s.selectedLoras}>
                        <p>Selected loras:</p>
                        {
                            info?.selectedLoras?.loras.map((el) => {
                                return (
                                    <p className={s.lora}>{el}</p>
                                )
                            })
                        }
                    </div>
                }
                <div className={s.description}>
                    <p>Picture size:</p>
                    <p>{info?.ratioWidth}x{info?.ratioHeight}</p>
                </div>
                <div className={s.description}>
                    <p>VAE:</p>
                    <p>{info?.vae}</p>
                </div>
                <div className={s.description}>
                    <p>Sampling method:</p>
                    <p>{info?.samplingMethod}</p>
                </div>
                <div className={s.description}>
                    <p>Upscale method:</p>
                    <p>{info?.upscaleMethod}</p>
                </div>
                <div className={s.description}>
                    <p>Sampling steps:</p>
                    <p>{info?.sampling}</p>
                </div>
                <div className={s.description}>
                    <p>CFG:</p>
                    <p>{info?.CFG}</p>
                </div>
                <div className={s.description}>
                    <p>Upscale factor:</p>
                    <p>{info?.upscaleFactor}</p>
                </div>
                <div className={s.promptText}>
                    <p>Prompt:</p>
                    <p>{promptText}</p>
                </div>
                <button onClick={handleDownload} className={s.downloadBtn}>download</button>
            </div>
        </div>
    )
}