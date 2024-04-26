import { useGetAvailableModels } from '../../../hooks/useGetAvailableModels'
import s from './modelsModal.module.css'

export const ModelsModal = ({ changeVisibility, selectModel }: {
     changeVisibility: () => void,
     selectModel: (modelName: string) => void
    }) => {

    const models = useGetAvailableModels();

    return (
        <div className={s.modalWrap}>
            <div onClick={changeVisibility} className={s.closeBG}></div>
            <div className={s.modal}>
                {models.map((model, index) => {
                    return (
                        <button onClick={() => selectModel(model)} className={s.modelBtn} key={index}>{model}</button>
                    )
                })}
            </div>
        </div>
    )
}