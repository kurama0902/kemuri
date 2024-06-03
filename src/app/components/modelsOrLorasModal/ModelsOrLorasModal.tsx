
import { memo, useEffect, useState } from 'react';
import { useGetModels } from '../../../../hooks/useGetModels';

import s from './modelsOrLorasModal.module.css'
import { Pagination } from '@mui/material';

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
    const models = useGetModels(page);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (visibility === false) {
            timer = setTimeout(() => changeVisibility(null), 300)
        }

        return () => clearTimeout(timer);
    }, [visibility])

    return (
        <div className={`${s.modalWrap} ${visibility !== null && s.show} `}>
            <div onClick={() => changeVisibility(false)} className={`${s.closeBG} ${visibility === false && s.hideBG}`}></div>
            <div className={`${s.modal} ${visibility === false && s.hideModal}`}>
                <div className={s.imagesWrap}>
                    <Pagination className={s.modalPagination} size='medium' onChange={handlePageChange} page={page} count={10} variant="outlined" color="secondary" />
                    {models?.map(model => {
                        return <button onClick={() => selectModel !== undefined && selectModel({ modelName: model.modelName, category: model.modelCategory })} className={s.modelWrap} key={model.modelName}>
                            <img className={s.modelImage} src={model.modelImage} alt={model.modelCategory} />
                            <p className={s.modelName}>{model.modelName}</p>
                            <p className={s.modelCategory}>{model.modelCategory}</p>
                            <p className={`${s.selectedText} ${(selectedModel === model.modelName) && s.selected}`}>selected</p>
                        </button>
                    })}
                </div>
            </div>
        </div>
    )
})

ModelsOrLorasModal.displayName = 'ModelsOrLorasModal';