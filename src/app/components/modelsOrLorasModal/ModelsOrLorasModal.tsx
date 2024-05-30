
import { memo, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getModels } from '../../../../queryFunctions/getModels';


import s from './modelsOrLorasModal.module.css'

export const ModelsOrLorasModal = memo(({ visibility, changeVisibility, selectedModel, selectModel, selectLoras, selectedLoras, choice }: {
    visibility: boolean | null;
    changeVisibility: (state: boolean | null) => void,
    selectedModel?: string;
    selectModel?: ({ modelName, category }: { modelName: string, category: string }) => void,
    selectLoras?: ({ lora, category }: { lora: string, category: string }) => void,
    selectedLoras?: {
        loras: string[],
        category: string
    },
    choice: string
}) => {

    const [page, setPage] = useState<number>(1);

    const queryClient = useQueryClient();

    const {data, isLoading, error} = useQuery({queryKey: ['models', page, 8], queryFn: getModels})

    console.log('modal render');
    
    

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
            <div className={`${s.modal} ${visibility === false && s.hideModal}`}>
                {/* <button onClick={() => setPage(prev => prev + 1)} className={s.changePage}>Next</button> */}
                {error && <p>Error</p>}
                {isLoading && <p>Loading</p>}
                {data?.map(model => {                    
                    return <button onClick={() => selectModel !== undefined && selectModel({modelName: model.modelName, category: model.modelCategory})} className={s.modelWrap} key={model.modelName}>
                        <img className={s.modelImage} src={model.modelImage} alt={model.modelCategory} />
                        <p className={s.modelName}>{model.modelName}</p>
                        <p className={s.modelCategory}>{model.modelCategory}</p>
                        <p className={`${s.selectedText} ${(selectedModel === model.modelName) && s.selected}`}>selected</p>
                    </button>
                })}
            </div>
        </div>
    )
})