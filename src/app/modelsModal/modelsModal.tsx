import { useGetAvailableModels } from '../../../hooks/useGetAvailableModels'
import s from './modelsModal.module.css'

export const ModelsModal = ({ changeVisibility, selectModel }: {
    changeVisibility: () => void,
    selectModel: (modelName: string) => void
}) => {

    const allModels = useGetAvailableModels();


    return (
        <div className={s.modalWrap}>
            <div onClick={changeVisibility} className={s.closeBG}></div>
            <div className={s.modal}>
                {allModels.map((models: {
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
                                {models[categoryKey]?.map((model, mIndex) => {
                                    return (
                                        <button onClick={() => selectModel(model)} className={s.modelBtn} key={mIndex}>{model}</button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}