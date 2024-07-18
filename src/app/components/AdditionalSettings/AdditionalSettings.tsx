import { ChangeEvent, useContext } from 'react'
import { ModelsOrLorasModal } from '../modelsOrLorasModal'
import { ModalContext } from '../../../../context/ModalContext'
import { Select } from './Select'

import s from './additional-settings.module.css'

export const AdditionalSettings = () => {

    const modalContext = useContext(ModalContext);
    
    if(modalContext === null) {
        return;
    }

    const aspectRatioList: { name: string, size: string }[] = [
        { name: 'portrait', size: '768x1152' },
        { name: 'landscape', size: '1152x768' },
        { name: 'square', size: '1024x1024' },
    ];

    const handleChangeVisibility = (state: { modalName: string, isShow: boolean } | null) => {
        modalContext?.changeVisibility(state);
    }

    const changeRatioByButton = (width: number, height: number, aspectRatio: string) => () => {
        modalContext?.setRatio({ width, height, aspectRatio })
    }

    const changeRatioByInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        if (type === 'width') {

            const sizes = aspectRatioList.map(size => size.size);
            const enteredRatio = `${e.target.value}x${modalContext?.ratio.height}`;

            if (sizes.includes(enteredRatio)) {
                modalContext?.setRatio({ width: Number(e.target.value), height: modalContext?.ratio.height, aspectRatio: aspectRatioList[sizes.indexOf(enteredRatio)].name })
            } else {
                modalContext?.setRatio({ width: Number(e.target.value), height: modalContext?.ratio.height, aspectRatio: 'custom' })
            }
        }

        if (type === 'height') {

            const sizes = aspectRatioList.map(size => size.size);
            const enteredRatio = `${modalContext?.ratio.width}x${e.target.value}`;

            if (sizes.includes(enteredRatio)) {
                modalContext?.setRatio({ width: modalContext?.ratio.width, height: Number(e.target.value), aspectRatio: aspectRatioList[sizes.indexOf(enteredRatio)].name })
            } else {
                modalContext?.setRatio({ width: modalContext?.ratio.width, height: Number(e.target.value), aspectRatio: 'custom' })
            }
        }
    }

    const changeRatioByNumberInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.value.includes('e') || e.target.value === '') {
            e.target.value = '';
        }        

        if (type === 'width') {
            const sizes = aspectRatioList.map(size => size.size);

            const enteredRatio = `${e.target.value}x${modalContext?.ratio.height}`;

            if (sizes.includes(enteredRatio)) {
                modalContext?.setRatio({ width: Number(e.target.value), height: modalContext?.ratio.height, aspectRatio: aspectRatioList[sizes.indexOf(enteredRatio)].name })
            } else {
                modalContext?.setRatio({ width: Number(e.target.value), height: modalContext?.ratio.height, aspectRatio: 'custom' })
            }
        }

        if (type === 'height') {
            const sizes = aspectRatioList.map(size => size.size);
            const enteredRatio = `${modalContext?.ratio.width}x${e.target.value}`;


            if (sizes.includes(enteredRatio)) {
                modalContext?.setRatio({ width: modalContext?.ratio.width, height: Number(e.target.value), aspectRatio: aspectRatioList[sizes.indexOf(enteredRatio)].name })
            } else {
                modalContext?.setRatio({ width: modalContext?.ratio.width, height: Number(e.target.value), aspectRatio: 'custom' })
            }
        }
    }

    const changeSapmlingOrScaleFactorOrCFG = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.value.includes('e') || e.target.value === '0') e.target.value = '';
        if (type === 'sampling') {
            modalContext?.setSampling(Number(e.target.value));
        }

        if (type === 'cfg') {
            modalContext?.setCFG(Number(e.target.value));
        }

        if (type === 'scaleFactor') {
            modalContext?.setUpscaleFactor(Number(e.target.value));
        }
    }

    return (
        <div className={s.additionalSettings}>
            <h3 className={s.settingsText}>Settings</h3>
            {/* <div className={`${s.btnWrap} ${modalContext?.visibility?.isShow && s.mobBtnWrap}`}> */}
                <button onClick={() => handleChangeVisibility({ modalName: 'loras', isShow: true })} className={s.addLoraBtn}>
                    <span>add lora</span>
                </button>
                {/* <div className={s.btnBG}></div> */}
            {/* </div> */}
            {modalContext.selectedLoras.loras.length > 0 && <Select text='Lora Weight' selectedLoras={modalContext.selectedLoras} selectLoras={modalContext.selectLoras} loraWeights={modalContext.loraWeights} handleSetLoraWeights={modalContext.handleSetLoraWeights} />}
            <div className={s.aspectRatioWrap}>
                <p className={s.aspectRatioText}>Aspect Ratio</p>
                <div className={s.aspectRatio}>
                    <button onClick={changeRatioByButton(768, 1152, "portrait")} className={`${s.ratioBtn} ${modalContext.ratio.aspectRatio === 'portrait' ? s.selectedRatio : ''}`}>
                        <span className={s.ratioType}>Portrait</span>
                        <span className={s.ratioText}>768x1152</span>
                    </button>
                    <button onClick={changeRatioByButton(1152, 768, "landscape")} className={`${s.ratioBtn} ${modalContext.ratio.aspectRatio === 'landscape' ? s.selectedRatio : ''}`}>
                        <span className={s.ratioType}>Landscape</span>
                        <span className={s.ratioText}>1152x768</span>
                    </button>
                    <button onClick={changeRatioByButton(1024, 1024, "square")} className={`${s.ratioBtn} ${modalContext.ratio.aspectRatio === 'square' ? s.selectedRatio : ''}`}>
                        <span className={s.ratioType}>Square</span>
                        <span className={s.ratioText}>1024x1024</span>
                    </button>
                    <button className={`${s.ratioBtn} ${modalContext.ratio.aspectRatio === 'custom' ? s.selectedRatio : ''}`}>
                        <span className={s.ratioType}>Custom</span>
                        <span className={s.ratioText}>custom</span>
                    </button>
                </div>
            </div>
            <div className={s.customAspectRatioWrap}>
                <div className={s.customAspectRatio}>
                    <p className={s.widthText}>Width</p>
                    <div className={s.inputsWrap}>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeRatioByInput(e, "width")} className={s.rangeInput} value={modalContext.ratio.width} min={512} max={2048} step={1} type="range" />
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeRatioByNumberInput(e, "width")} className={`${s.numberInput} ${(modalContext.ratio.width < 512 || modalContext.ratio.width > 2048) && s.incorrectInput}`} value={modalContext.ratio.width === 0 ? '' : modalContext.ratio.width} min={512} max={2048} step={1} type="number" />
                    </div>
                </div>
                <div className={s.customAspectRatio}>
                    <p className={s.heightText}>Height</p>
                    <div className={s.inputsWrap}>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeRatioByInput(e, "height")} className={s.rangeInput} value={modalContext.ratio.height} min={512} max={2048} step={1} type="range" />
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeRatioByNumberInput(e, "height")} className={`${s.numberInput} ${(modalContext.ratio.height < 512 || modalContext.ratio.height > 2048) && s.incorrectInput}`} value={modalContext.ratio.height === 0 ? '' : modalContext.ratio.height} min={512} max={2048} step={1} type="number" />
                    </div>
                </div>
            </div>
            <Select text='VAE' vae={modalContext.vae} handleSetVae={modalContext.handleSetVae} />
            <Select text='Sampling Method' samplingMethod={modalContext.samplingMethod} handleSetSamplingMethod={modalContext.handleSetSamplingMethod} />
            <Select text='Upscaler' upscaleMethod={modalContext.upscaleMethod} handleSetUpscaleMethod={modalContext.handleSetUpscaleMethod} />
            <div className={s.stepsScaleWrap}>
                <div className={s.steps}>
                    <p className={s.samplingStepsText}>Sampling Steps</p>
                    <div className={s.inputsWrap}>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrScaleFactorOrCFG(e, 'sampling')} value={modalContext.sampling} className={s.rangeInput} min={20} max={70} type="range" step={1} />
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrScaleFactorOrCFG(e, 'sampling')} value={modalContext.sampling === 0 ? '' : modalContext.sampling} className={`${s.numberInput} ${(modalContext.sampling < 20 || modalContext.sampling > 70) && s.incorrectInput}`} min={20} max={70} type="number" step={1} />
                    </div>
                </div>
                <div className={s.scale}>
                    <p className={s.scaleText}>CFG Scale</p>
                    <div className={s.inputsWrap}>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrScaleFactorOrCFG(e, 'cfg')} value={modalContext.CFG} className={s.rangeInput} min={1} max={10} type="range" step={1} />
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrScaleFactorOrCFG(e, 'cfg')} value={modalContext.CFG === 0 ? '' : modalContext.CFG} className={`${s.numberInput} ${(modalContext.CFG < 1 || modalContext.CFG > 10) && s.incorrectInput}`} min={1} max={10} type="number" step={1} />
                    </div>
                </div>
            </div>
            <div className={s.upscaleFactorWrap}>
                <p className={s.upscaleFactorText}>Upscale Factor</p>
                <div className={s.inputsWrap}>
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrScaleFactorOrCFG(e, 'scaleFactor')} value={modalContext.upscaleFactor} className={s.rangeInput} min={1} max={2} type="range" step={.1} />
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => changeSapmlingOrScaleFactorOrCFG(e, 'scaleFactor')} value={modalContext.upscaleFactor === 0 ? '' : modalContext.upscaleFactor} className={`${s.numberInput} ${(modalContext.upscaleFactor < 1 || modalContext.upscaleFactor > 2) && s.incorrectInput}`} min={1} max={2} type="number" step={.1} />
                </div>
            </div>
            <ModelsOrLorasModal choice='loras' />
        </div>
    )
}