
import { memo, useEffect, useState } from 'react';
import { useGetModels } from '../../../../hooks/useGetModels';
import { Pagination } from '@mui/material';
import { GeneratingPreloader } from '../GeneratingPreloader';

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const models = useGetModels(page);
    console.log(models, 'models');


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setIsLoading(true)
        setPage(value)
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (visibility === false) {
            timer = setTimeout(() => changeVisibility(null), 300)
        }
        setTimeout(() => {
            if (isLoading === true) setIsLoading(false);
        }, 300)

        return () => clearTimeout(timer);
    }, [visibility, isLoading])

    return (
        <div className={`${s.modalWrap} ${visibility !== null && s.show} `}>
            <div onClick={() => changeVisibility(false)} className={`${s.closeBG} ${visibility === false && s.hideBG}`}></div>
            <div className={`${s.modal} ${visibility === false && s.hideModal}`}>
                <div className={s.imagesWrap}>
                    <Pagination
                        className={s.modalPagination}
                        size='large' onChange={handlePageChange}
                        page={page} count={100}
                        variant="outlined"
                        color="secondary"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                borderColor: 'rgba(255, 255, 255, 0.466)',
                                color: 'white',

                                '&.Mui-selected': {
                                    borderColor: 'rgba(206, 147, 216, 0.5)',
                                    color: 'rgb(206, 147, 216)'
                                },

                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',  // Колір рамки при наведенні
                                },
                            },

                            '& .MuiPagination-ul': {
                                flexDirection: 'column',
                                color: 'white',
                                gap: '5px',

                                backgroundColor: '#0000003b',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                borderTopRightRadius: '8px',
                                borderBottomRightTadius: '8px',
                            }
                        }} />

                    {isLoading && <GeneratingPreloader />}
                    {models === undefined && <h1 className={s.errorText}>Error</h1>}
                    {models === null && <h1 className={s.emptyText}>Page {page} is empty..</h1>}
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