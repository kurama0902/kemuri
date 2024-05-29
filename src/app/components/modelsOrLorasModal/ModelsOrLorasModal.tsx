
import { useEffect } from 'react';
import s from './modelsOrLorasModal.module.css'

export const ModelsOrLorasModal = ({ visibility, changeVisibility, selectModel, selectLoras, selectedLoras, choice }: {
    visibility: boolean | null;
    changeVisibility: (state: boolean | null) => void,
    selectModel?: ({ modelName, category }: { modelName: string, category: string }) => void,
    selectLoras?: ({ lora, category }: { lora: string, category: string }) => void,
    selectedLoras?: {
        loras: string[],
        category: string
    },
    choice: string
}) => {

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if(visibility === false) {
            timer = setTimeout(() => changeVisibility(null), 300)
        }

        return () => clearTimeout(timer);
    }, [visibility])

    return (
        <div className={`${s.modalWrap} ${visibility !== null && s.show} `}>
            <div onClick={() => changeVisibility(false)} className={`${s.closeBG} ${visibility === false && s.hideBG}`}></div>
            <div className={`${s.modal} ${visibility === false && s.hideModal}`}></div>
        </div>
    )
}