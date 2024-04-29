import { useState } from 'react'
import { Select } from './Select'

import s from './additional-settings.module.css'
import { ModelsOrLorasModal } from '../modelsOrLorasModal'

export const AdditionalSettings = ({ selectedLoras, selectLoras }: {
    selectedLoras: {
        loras: string[],
        category: string
    },
    selectLoras: ({lora, category}: {lora: string, category: string}) => void
}) => {

    const [isShowModal, setIsShowModal] = useState<boolean>(false)

    const changeVisibility = () => {
        setIsShowModal(prev => {
            return !prev
        })
    }

    return (
        <div className={s.additionalSettings}>
            <h3 className={s.settingsText}>Settings</h3>
            <button onClick={changeVisibility} className={s.addLoraBtn}>add lora</button>
            <div className={s.aspectRatioWrap}>
                <p className={s.aspectRatioText}>Aspect Ratio</p>
                <div className={s.aspectRatio}>
                    <button className={s.ratioBtn}>
                        <span className={s.ratioType}>Portrait</span>
                        <span className={s.ratioText}>768x1152</span>
                    </button>
                    <button className={s.ratioBtn}>
                        <span className={s.ratioType}>Landscape</span>
                        <span className={s.ratioText}>1152x768</span>
                    </button>
                    <button className={s.ratioBtn}>
                        <span className={s.ratioType}>Square</span>
                        <span className={s.ratioText}>1024x1024</span>
                    </button>
                    <button className={s.ratioBtn}>
                        <span className={s.ratioType}>Custom</span>
                        <span className={s.ratioText}>custom</span>
                    </button>
                </div>
            </div>
            <div className={s.customAspectRatioWrap}>
                <div className={s.customAspectRatio}>
                    <p className={s.widthText}>Width</p>
                    <div className={s.inputsWrap}>
                        <input className={s.rangeInput} min={512} max={2048} type="range" />
                        <input className={s.numberInput} min={512} max={2048} type="number" />
                    </div>
                </div>
                <div className={s.customAspectRatio}>
                    <p className={s.heightText}>Height</p>
                    <div className={s.inputsWrap}>
                        <input className={s.rangeInput} min={512} max={2048} type="range" />
                        <input className={s.numberInput} min={512} max={2048} type="number" />
                    </div>
                </div>
            </div>
            <Select text='Sampling Method' />
            <div className={s.stepsScaleWrap}>
                <div className={s.steps}>
                    <p className={s.samplingStepsText}>Sampling Steps</p>
                    <div className={s.inputsWrap}>
                        <input className={s.rangeInput} min={20} max={70} type="range" />
                        <input className={s.numberInput} min={20} max={70} type="number" />
                    </div>
                </div>
                <div className={s.scale}>
                    <p className={s.scaleText}>CFG Scale</p>
                    <div className={s.inputsWrap}>
                        <input className={s.rangeInput} min={1} max={10} type="range" />
                        <input className={s.numberInput} min={1} max={10} type="number" />
                    </div>
                </div>
            </div>
            {isShowModal && <ModelsOrLorasModal changeVisibility={changeVisibility} selectedLoras={selectedLoras} selectLoras={selectLoras} choice='loras' />}
        </div>
    )
}