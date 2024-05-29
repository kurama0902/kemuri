import { ChangeEvent, useState } from 'react'
import { Select } from './Select'

import s from './additional-settings.module.css'
import { ModelsOrLorasModal } from '../modelsOrLorasModal'

export const AdditionalSettings = ({ selectedLoras, selectLoras, vae, handleSetVae, samplingMethod, handleSetSamplingMethod }: {
    selectedLoras: {
        loras: string[],
        category: string
    },
    selectLoras: ({ lora, category }: { lora: string, category: string }) => void,
    vae: string,
    handleSetVae: (vae: string) => void,
    samplingMethod: string,
    handleSetSamplingMethod: (method: string) => void
}) => {

    type RatioType = {
        width: number;
        height: number;
        aspectRatio: string
    }


    const aspectRatioList: { name: string, size: string }[] = [
        { name: 'portrait', size: '768x1152' },
        { name: 'landscape', size: '1152x768' },
        { name: 'square', size: '1024x1024' },
    ];

    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [ratio, setRatio] = useState<RatioType>({
        width: 768,
        height: 1152,
        aspectRatio: 'portrait'
    });

    const [sampling, setSampling] = useState<number>(20);
    const [CFG, setCFG] = useState<number>(1);


    const changeVisibility = () => {
        setIsShowModal(prev => {
            return !prev
        })
    }

    const changeRatioByButton = (width: number, height: number, aspectRatio: string) => () => {
        setRatio({ width, height, aspectRatio })
    }

    const changeRatioByInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        if (type === 'width') {

            const sizes = aspectRatioList.map(size => size.size);
            const enteredRatio = `${e.target.value}x${ratio.height}`;

            if (sizes.includes(enteredRatio)) {
                setRatio({ width: Number(e.target.value), height: ratio.height, aspectRatio: aspectRatioList[sizes.indexOf(enteredRatio)].name })
            } else {
                setRatio({ width: Number(e.target.value), height: ratio.height, aspectRatio: 'custom' })
            }
        }

        if (type === 'height') {

            const sizes = aspectRatioList.map(size => size.size);
            const enteredRatio = `${ratio.width}x${e.target.value}`;

            if (sizes.includes(enteredRatio)) {
                setRatio({ width: ratio.width, height: Number(e.target.value), aspectRatio: aspectRatioList[sizes.indexOf(enteredRatio)].name })
            } else {
                setRatio({ width: ratio.width, height: Number(e.target.value), aspectRatio: 'custom' })
            }
        }
    }

    const changeRatioByNumberInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.value.includes('e')) e.target.value = '';

        if (type === 'width') {
            const sizes = aspectRatioList.map(size => size.size);

            const enteredRatio = `${e.target.value}x${ratio.height}`;

            if (sizes.includes(enteredRatio)) {
                setRatio({ width: Number(e.target.value), height: ratio.height, aspectRatio: aspectRatioList[sizes.indexOf(enteredRatio)].name })
            } else {
                setRatio({ width: Number(e.target.value), height: ratio.height, aspectRatio: 'custom' })
            }
        }

        if (type === 'height') {
            const sizes = aspectRatioList.map(size => size.size);
            const enteredRatio = `${ratio.width}x${e.target.value}`;


            if (sizes.includes(enteredRatio)) {
                setRatio({ width: ratio.width, height: Number(e.target.value), aspectRatio: aspectRatioList[sizes.indexOf(enteredRatio)].name })
            } else {
                setRatio({ width: ratio.width, height: Number(e.target.value), aspectRatio: 'custom' })
            }
        }
    }

    const changeSapmlingOrCFG = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.value.includes('e')) e.target.value = '';
        if (type === 'sampling') {
            setSampling(Number(e.target.value));
        }

        if (type === 'cfg') {
            setCFG(Number(e.target.value));
        }
    }

    return (
        <div className={s.additionalSettings}>
            <h3 className={s.settingsText}>Settings</h3>
            <div className={`${s.btnWrap} ${isShowModal && s.mobBtnWrap}`}>
                <button onClick={changeVisibility} className={s.addLoraBtn}>
                    <span>add lora</span>
                </button>
                <div className={s.btnBG}></div>
            </div>
            <div className={s.aspectRatioWrap}>
                <p className={s.aspectRatioText}>Aspect Ratio</p>
                <div className={s.aspectRatio}>
                    <button onClick={changeRatioByButton(768, 1152, "portrait")} className={`${s.ratioBtn} ${ratio.aspectRatio === 'portrait' ? s.selectedRatio : ''}`}>
                        <span className={s.ratioType}>Portrait</span>
                        <span className={s.ratioText}>768x1152</span>
                    </button>
                    <button onClick={changeRatioByButton(1152, 768, "landscape")} className={`${s.ratioBtn} ${ratio.aspectRatio === 'landscape' ? s.selectedRatio : ''}`}>
                        <span className={s.ratioType}>Landscape</span>
                        <span className={s.ratioText}>1152x768</span>
                    </button>
                    <button onClick={changeRatioByButton(1024, 1024, "square")} className={`${s.ratioBtn} ${ratio.aspectRatio === 'square' ? s.selectedRatio : ''}`}>
                        <span className={s.ratioType}>Square</span>
                        <span className={s.ratioText}>1024x1024</span>
                    </button>
                    <button className={`${s.ratioBtn} ${ratio.aspectRatio === 'custom' ? s.selectedRatio : ''}`}>
                        <span className={s.ratioType}>Custom</span>
                        <span className={s.ratioText}>custom</span>
                    </button>
                </div>
            </div>
            <div className={s.customAspectRatioWrap}>
                <div className={s.customAspectRatio}>
                    <p className={s.widthText}>Width</p>
                    <div className={s.inputsWrap}>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeRatioByInput(e, "width")} className={s.rangeInput} value={ratio.width} min={512} max={2048} step={1} type="range" />
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeRatioByNumberInput(e, "width")} className={s.numberInput} value={ratio.width} min={512} max={2048} step={1} type="number" />
                    </div>
                </div>
                <div className={s.customAspectRatio}>
                    <p className={s.heightText}>Height</p>
                    <div className={s.inputsWrap}>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeRatioByInput(e, "height")} className={s.rangeInput} value={ratio.height} min={512} max={2048} step={1} type="range" />
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeRatioByNumberInput(e, "height")} className={s.numberInput} value={ratio.height} min={512} max={2048} step={1} type="number" />
                    </div>
                </div>
            </div>
            <Select text='VAE' vae={vae} handleSetVae={handleSetVae} />
            <Select text='Sampling Method' samplingMethod={samplingMethod} handleSetSamplingMethod={handleSetSamplingMethod} />
            <div className={s.stepsScaleWrap}>
                <div className={s.steps}>
                    <p className={s.samplingStepsText}>Sampling Steps</p>
                    <div className={s.inputsWrap}>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrCFG(e, 'sampling')} value={sampling} className={s.rangeInput} min={20} max={70} type="range" step={1} />
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrCFG(e, 'sampling')} value={sampling} className={s.numberInput} min={20} max={70} type="number" step={1} />
                    </div>
                </div>
                <div className={s.scale}>
                    <p className={s.scaleText}>CFG Scale</p>
                    <div className={s.inputsWrap}>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrCFG(e, 'cfg')} value={CFG} className={s.rangeInput} min={1} max={10} type="range" step={1} />
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrCFG(e, 'cfg')} value={CFG} className={s.numberInput} min={1} max={10} type="number" step={1} />
                    </div>
                </div>
            </div>
            {isShowModal && <ModelsOrLorasModal visibility={isShowModal} changeVisibility={changeVisibility} selectedLoras={selectedLoras} selectLoras={selectLoras} choice='loras' />}
        </div>
    )
}