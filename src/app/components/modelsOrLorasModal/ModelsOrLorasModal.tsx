
import { memo, useContext, useEffect, useState } from 'react';

import { useGetModels } from '../../../../hooks/useGetModels';
import { GeneratingPreloader } from '../GeneratingPreloader';
import { ModalContext } from '../../../../context/ModalContext';
import { getSearchedData } from '../../../../utilites/getSearchedData';

import { Virtuoso } from 'react-virtuoso'

import { Pagination, TextField } from '@mui/material';

import s from './modelsOrLorasModal.module.css'

import { Loras, Models } from '../../../../types/types';

export const ModelsOrLorasModal = memo(({ choice }: { choice: string }) => {

    let modalContext = useContext(ModalContext);

    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const type = modalContext?.selectedLoras?.version;
    const modelsOrLoras = useGetModels(choice, page, choice === 'loras' ? type : '');
    const [searchedData, setSearchedData] = useState<Models[] | Loras[]>([]);

    // getSearchedData(searchText.current, choice === 'models' ? "all" : type || '', choice, setSearchedData, flag, setFlag);

    console.log(searchedData, 'searchedData');

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setIsLoading(true)
        setPage(value)
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (modalContext?.visibility?.isShow === false) {
            timer = setTimeout(() => {
                modalContext.changeVisibility(null);
            }, 300)
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
                <div className={s.searchWrap}>
                    <TextField
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                getSearchedData(e, choice === 'models' ? "all" : type || '', choice, setSearchedData);
                            } else {
                                setSearchedData([]);
                            }
                        }}
                        id="standard-basic"
                        label="Search..."
                        variant="standard"
                        sx={{
                            input: { color: 'white' },
                            label: { color: 'white' },
                            '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                            '&:hover .MuiInput-underline:before': { borderBottomColor: 'white' },
                            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: 'lightgrey' },

                        }}
                    />
                    {
                        searchedData.length > 0 &&
                        <div className={s.searchPopup}>
                            <Virtuoso
                                style={{ height: '200px', maxWidth: '350px', width: '100%' }}
                                totalCount={searchedData.length}
                                itemContent={(index) => {
                                    const item = searchedData[index];
                                    if (choice === 'models') {
                                        const model = item as Models;
                                        return (
                                            <button key={model.name + index} onClick={() => modalContext?.selectModel !== undefined && modalContext.selectModel({ modelName: model.name, category: model.modelCategory })} className={s.popupItem}>
                                                <img className={s.popupImage} src={model.image_url} alt="" />
                                                <p className={s.modelName}>{model.name}</p>
                                                <p className={s.modelCategory}>{model.modelCategory}</p>
                                                <p className={`${s.selectedText} ${model.name === modalContext?.selectedModel?.modelName && s.selected}`}>selected</p>
                                            </button>
                                        );
                                    } else {
                                        const lora = item as Loras;
                                        return (
                                            <button key={lora.name + index} onClick={() => modalContext?.selectLoras !== undefined && modalContext.selectLoras({ lora: lora.name, version: lora.version })} className={s.popupItem}>
                                                <img className={s.popupImage} src={lora.image_url} alt="" />
                                                <p className={s.modelName}>{lora.name}</p>
                                                <p className={s.version}>{lora.version}</p>
                                                <p className={s.class}>{lora.class}</p>
                                                <p className={`${s.selectedText} ${modalContext?.selectedLoras?.loras.includes(lora.name) && s.selected}`}>selected</p>
                                            </button>
                                        );
                                    }
                                }}
                            />
                        </div>
                    }
                </div>
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
                <button onClick={() => {
                    modalContext?.visibility?.modalName !== undefined && modalContext?.changeVisibility({ modalName: modalContext.visibility?.modalName, isShow: false })
                }} className={s.closeBtn}>
                    X
                </button>
            </div>
        </div>
    )
})

ModelsOrLorasModal.displayName = 'ModelsOrLorasModal';