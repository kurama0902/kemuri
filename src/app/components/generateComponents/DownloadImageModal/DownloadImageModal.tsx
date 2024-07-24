import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../../../../context/ModalContext';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Zoom, Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import s from './dowloadImageModal.module.css';

export const DownloadImageModal = ({ linkList, inSlide, selectLink, promptText }: { linkList: string[], inSlide: number, mw: number, mn: number, selectLink: (link: string | null) => void, promptText: string }) => {

    const [isOpen, setIsOpen] = useState<boolean | null>(null);
    const [flag, setFlag] = useState<boolean | null>(null);
    const [isDetailsShow, setIsDetailsShow] = useState<boolean>(false);

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

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try {
            const zip = new JSZip();

            const fetchImages = linkList.map(async (link, index) => {
                const res = await fetch(link);
                const image = await res.blob();
                zip.file(`generation_${index + 1}.png`, image);
            });

            await Promise.all(fetchImages);

            const blob = await zip.generateAsync({ type: 'blob' });
            console.log(blob);

            saveAs(blob, 'images.zip');
        } catch (error) {
            console.error('Failed downloading..', error);
        }
    };

    return (
        <div className={s.modalWrap}>
            <Swiper
                zoom={true}
                initialSlide={inSlide}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Zoom, Navigation, Pagination, Mousewheel, Keyboard]}
                onZoomChange={(swiper, scale, imageEl, slideEl) => {
                    if(scale === 1) {
                        setIsDetailsShow(false);
                    } else {
                        setIsDetailsShow(true);
                    }
                }}
                className="mySwiper"
            >
                {
                    linkList.map((link, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div onClick={() => setFlag(true)} className={s.closeBG}></div>
                                <div style={{ maxWidth: `${info?.ratio.width}px`, height: 'auto' }} className={s.imageWrap}>
                                    {
                                        !isDetailsShow &&
                                        <div className={s.optionsWrap}>
                                            <button onClick={handleSetOpen} className={s.moreBtn}>
                                                <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" id="Flat" viewBox="0 0 256 256">
                                                    <path fill="#ffffff" d="M160,128a32,32,0,1,1-32-32A32.03164,32.03164,0,0,1,160,128ZM48,96a32,32,0,1,0,32,32A32.03164,32.03164,0,0,0,48,96Zm160,0a32,32,0,1,0,32,32A32.03164,32.03164,0,0,0,208,96Z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => setFlag(true)} className={`${s.closeBtn} ${s.static}`}>
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                </svg>
                                            </button>
                                        </div>
                                    }
                                    <div className='swiper-zoom-container'>
                                        <img style={{ width: '100%' }} className={s.image} src={link} alt="" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
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
                                    <p key={el} className={s.lora}>{el}</p>
                                )
                            })
                        }
                    </div>
                }
                <div className={s.description}>
                    <p>Picture size:</p>
                    <p>{info?.ratio.width}x{info?.ratio.height}</p>
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