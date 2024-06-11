
import { memo, useContext, useEffect, useState } from 'react';

import { useGetModels } from '../../../../hooks/useGetModels';
import { GeneratingPreloader } from '../GeneratingPreloader';
import { ModalContext } from '../../../../context/ModalContext';

import { Pagination } from '@mui/material';

import s from './modelsOrLorasModal.module.css'

export const ModelsOrLorasModal = memo(({ choice }: { choice: string }) => {

    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const modelsOrLoras = useGetModels(choice, page);


    let modalContext = useContext(ModalContext);


    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setIsLoading(true)
        setPage(value)
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (modalContext?.visibility?.isShow === false) {
            timer = setTimeout(() => modalContext.changeVisibility(null), 300)
        }
        setTimeout(() => {
            if (isLoading === true) setIsLoading(false);
        }, 300)

        return () => clearTimeout(timer);
    }, [modalContext?.visibility, isLoading])



    return (
        <div className={`${s.modalWrap} ${(modalContext?.visibility !== null && modalContext?.visibility?.modalName === choice) && s.show} `}>
            <div onClick={() => modalContext?.visibility?.modalName !== undefined && modalContext?.changeVisibility({ modalName: modalContext.visibility.modalName, isShow: false })} className={`${s.closeBG} ${(modalContext?.visibility?.isShow === false) && s.hideBG}`}></div>
            <div className={`${s.modal} ${(modalContext?.visibility?.isShow === false) && s.hideModal}`}>
                <div className={s.imagesWrap}>
                    <Pagination
                        className={s.modalPagination}
                        size='large' onChange={handlePageChange}
                        page={page} count={modelsOrLoras?.pagesCount}
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
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
                    {modelsOrLoras === undefined && <h1 className={s.errorText}>Error</h1>}
                    {modelsOrLoras === null && <h1 className={s.emptyText}>Page {page} is empty..</h1>}
                    {modelsOrLoras?.data?.map((modelOrLora, index) => {
                        return <button onClick={() => {
                            if (choice === 'models') {
                                (modalContext?.selectModel !== undefined && modelOrLora.modelCategory !== undefined) && modalContext.selectModel({ modelName: modelOrLora.name, category: modelOrLora.modelCategory })
                            } else {
                                (modalContext?.selectLoras !== undefined && modelOrLora.version !== undefined) && modalContext.selectLoras({ lora: modelOrLora.name, version: modelOrLora.version })
                            }
                        }
                        } className={`${s.modelWrap} ${(choice !== 'models' && (modelOrLora.version !== modalContext?.selectedModel?.category)) && s.blockBtn}`} key={modelOrLora.name}>
                            <img className={s.modelImage} src={modelOrLora.image_url} alt={modelOrLora.modelCategory} />
                            <p className={`${s.modelName} ${choice !== 'models' && s.loraName}`}>{modelOrLora.name}</p>
                            {choice === 'models' && <p className={s.modelCategory}>{modelOrLora.modelCategory}</p>}
                            {
                                choice === 'models' 
                                ? 
                                <p className={`${s.selectedText} ${(modalContext?.selectedModel?.modelName === modelOrLora.name) && s.selected}`}>selected</p>
                                :
                                <p className={`${s.selectedText} ${(modalContext?.selectedLoras?.loras.includes(modelOrLora.name)) && s.selected}`}>selected</p>

                            }
                            {choice !== 'models' && <p className={s.class}>{modelOrLora.class}</p>}
                            {choice !== 'models' && <p className={s.version}>{modelOrLora.version}</p>}
                        </button>
                    })}
                </div>
            </div>
        </div>
    )
})

ModelsOrLorasModal.displayName = 'ModelsOrLorasModal';