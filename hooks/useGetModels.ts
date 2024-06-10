import { useEffect, useState } from "react";

type ModelsOrLorasContent = {
    class?: string,
    sensitive?: string,
    version?: string
    modelCategory?: string,
    image_url: string,
    name: string
}

type ModelsOrLorasInfo = {
    data: ModelsOrLorasContent[],
    pagesCount: number;
}


export const useGetModels = (choice: string, page: number): ModelsOrLorasInfo | null | undefined => {

    const [modelsOrLoras, setModelsOrLoras] = useState<ModelsOrLorasInfo | null | undefined>(null);

    const getModels = async (page_size: number = 8) => {
        try {
            const res = await fetch(`https://api.kemuri.top/v1/${choice === 'models' ? choice : 'lora-link'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    page,
                    page_size
                })
            });

            const data = await res.json();
            
            if(data.data.length) {
                setModelsOrLoras(data);
            } else {
                setModelsOrLoras(null);
            }
        } catch (error) {
            console.error("Error while fetching models or loras..", error);
            setModelsOrLoras(undefined)
        }
    }


    useEffect(() => {
        getModels();
    }, [page])

    return modelsOrLoras;
}