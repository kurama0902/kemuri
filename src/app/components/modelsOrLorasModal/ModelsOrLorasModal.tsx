
import { memo, useContext, useEffect, useState } from 'react';

// import { GeneratingPreloader } from '../GeneratingPreloader';
import { ModalContext } from '../../../../context/ModalContext';
import { useGetSearchedData } from '../../../../hooks/useGetSearchedData';

import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'

import s from './modelsOrLorasModal.module.css'

import { Loras, Models } from '../../../../types/types';

export const ModelsOrLorasModal = memo(({ choice }: { choice: string }) => {

    let modalContext = useContext(ModalContext);

    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const type = modalContext?.selectedLoras?.version;
    const [searchText, setSearchText] = useState<string>('');
    const searchedData = useGetSearchedData(searchText, choice === 'models' ? "all" : type || '', choice);

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
                <input onChange={(e) => {
                    const isEmpty = e.target.value.trim().length > 0;
                    setSearchText(!isEmpty ? '' : e.target.value.trim());
                }} placeholder='Search..' className={`${s.searchInput} ${searchText.length > 0 && s.lightUnderline}`} type="text" />
                <VirtuosoGrid
                    // className={s.imagesWrap}
                    style={{ height: '565px' }}
                    totalCount={searchedData.length}
                    listClassName={s.imagesWrap}
                    itemClassName={s.modelWrap}
                    itemContent={(index) => {
                        const item = searchedData[index];

                        const m = item as Models;
                        const l = item as Loras;

                        return (
                            <button
                                style={{ maxWidth: '200px', minHeight: '270px', maxHeight: '270px' }}
                                onClick={() => {
                                    if (choice === 'models') {
                                        (modalContext?.selectModel !== undefined && m.modelCategory !== undefined) && modalContext.selectModel({ modelName: m.name, category: m.modelCategory })
                                    } else {
                                        (modalContext?.selectLoras !== undefined && l.version !== undefined) && modalContext.selectLoras({ lora: l.name, version: l.version })
                                    }
                                }}
                                className={`${s.btnStyle}`}
                                key={choice === 'models' ? m.name + index : l.name + index}
                            >
                                <img className={s.modelImage} src={choice === 'models' ? m.image_url : l.image_url} alt={choice === 'models' ? m.modelCategory : l.version} />
                                <p className={`${s.modelName} ${choice !== 'models' && s.loraName}`}>{choice === 'models' ? m.name : l.name}</p>
                                {choice === 'models' && <p className={s.modelCategory}>{m.modelCategory}</p>}
                                {
                                    choice === 'models'
                                        ?
                                        <p className={`${s.selectedText} ${(modalContext?.selectedModel?.modelName === m.name) && s.selected}`}>selected</p>
                                        :
                                        <p className={`${s.selectedText} ${(modalContext?.selectedLoras?.loras.includes(l.name)) && s.selected}`}>selected</p>

                                }
                                {choice !== 'models' && <p className={s.class}>{l.class}</p>}
                                {choice !== 'models' && <p className={s.version}>{l.version}</p>}
                            </button>
                        );
                    }}
                />

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