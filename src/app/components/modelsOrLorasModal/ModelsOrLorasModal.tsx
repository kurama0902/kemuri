"use client"

import { memo, useContext, useEffect, useState } from 'react';

import { ModalContext } from '../../../../context/ModalContext';
import { useGetSearchedData } from '../../../../hooks/useGetSearchedData';
import { Loras, Models } from '../../../../types/types';
import { useGetModalCategories } from '../../../../hooks/useGetModalCategories';

import { VirtuosoGrid } from 'react-virtuoso'

import s from './modelsOrLorasModal.module.css'


export const ModelsOrLorasModal = memo(({ choice }: { choice: string }) => {

    let modalContext = useContext(ModalContext);

    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const type = modalContext?.selectedLoras?.version;
    const [searchText, setSearchText] = useState<string>('');
    const { searchedData, setSearchedData, getData } = useGetSearchedData(searchText, choice === 'models' ? "all" : type || '', choice);
    const modalCategories = useGetModalCategories(choice);
    const [ctg, setCtg] = useState<string>('');

    const getDataByCategory = async (category: string, type: string) => {
        if (ctg !== category) {
            try {
                setCtg(category);
                const res = await fetch('https://api.kemuri.top/modal/getCategoriedML', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(choice === 'models' ? { models: category } : { loras: category, lora_type: type })
                })
                const data = await res.json();
                setSearchedData(data);
            } catch (error) {
                console.error('error while fetching certain modal category data', error);
            }
        } else {
            setCtg('');
            getData();
        }
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
                    <input onChange={(e) => {
                        const isEmpty = e.target.value.trim().length > 0;
                        setCtg('');
                        setSearchText(!isEmpty ? '' : e.target.value.trim());
                    }} placeholder='Search..' className={`${s.searchInput} ${searchText.length > 0 && s.lightUnderline}`} type="text" />
                    {
                        modalCategories.map(category => {
                            return (
                                <button onClick={() => {
                                    getDataByCategory(category, type || '');
                                }} key={category} className={`${s.ctgBtn} ${ctg === category && s.selectedCtg}`}>{category}</button>
                            )
                        })
                    }
                </div>
                <VirtuosoGrid
                    style={{ height: '565px' }}
                    totalCount={searchedData.length}
                    listClassName={`${s.imagesWrap}`}
                    itemClassName={s.modelWrap}
                    itemContent={(index) => {
                        const item = searchedData[index];

                        const m = item as Models;
                        const l = item as Loras;


                        return (
                            <button
                                style={{ width: '100%', minHeight: '270px', maxHeight: '270px' }}
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
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>

                </button>
            </div>
        </div>
    )
})

ModelsOrLorasModal.displayName = 'ModelsOrLorasModal';