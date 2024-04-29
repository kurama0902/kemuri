import { useGetAvailableModels } from '../../../hooks/useGetAvailableModels'
import { useGetLoras } from '../../../hooks/useGetLoras';

import s from './modelsOrLorasModal.module.css'

export const ModelsOrLorasModal = ({ changeVisibility, selectModel, selectLoras, selectedLoras, choice }: {
    changeVisibility: () => void,
    selectModel?: ({ modelName, category }: { modelName: string, category: string }) => void,
    selectLoras?: ({ lora, category }: { lora: string, category: string }) => void,
    selectedLoras?: {
        loras: string[],
        category: string
    },
    choice: string
}) => {

    const allModelsOrLoras = choice === 'models' ? useGetAvailableModels() : useGetLoras();


    return (
        <div className={s.modalWrap}>
            <div onClick={changeVisibility} className={s.closeBG}></div>
            <div className={s.modal}>
                {
                    choice === 'models'
                        ?
                        allModelsOrLoras.map((models: {
                            general_models?: string[],
                            sd_models?: string[],
                            sdxl_models?: string[]
                        }, index) => {

                            const categoryText = Object.keys(models)[0].split('_').join(' ');
                            const categoryKey = Object.keys(models)[0] as keyof typeof models;

                            return (
                                <div className={s.categoryWrap} key={index}>
                                    <p className={s.categoryText}>{categoryText}</p>
                                    <div className={s.modelsWrap}>
                                        {selectModel !== undefined && models[categoryKey]?.map((model, mIndex) => {
                                            return (
                                                <button onClick={() => selectModel({
                                                    modelName: model,
                                                    category: categoryKey
                                                })} className={s.modelBtn} key={mIndex}>{model}</button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                        :
                        allModelsOrLoras.map((loras: {
                            sd_loras?: string[],
                            sdxl_loras?: string[],
                        }, index) => {                            

                            const categoryText = Object.keys(loras)[0].split('_').join(' ');
                            const categoryKey = Object.keys(loras)[0] as keyof typeof loras;
                            
                            return (
                                <div className={s.categoryWrap} key={index}>
                                    <p className={s.categoryText}>{categoryText}</p>
                                    <div className={s.lorasWrap}>
                                        {selectLoras !== undefined && loras[categoryKey]?.map((lora, loraIndex) => {
                                            const isTrue = selectedLoras?.loras.includes(lora);
                                            console.log(isTrue);
                                            
                                            return (
                                                <button onClick={() => selectLoras({
                                                    lora: lora,
                                                    category: categoryKey
                                                })} className={`${s.loraBtn} ${isTrue && 'selected'}`} key={loraIndex}>{lora}</button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}