import { useEffect, useState } from "react";

type Models = {
    modelCategory: string,
    modelImage: string,
    modelName: string
}

export const useGetModels = (page: number): Models[] | null | undefined => {

    const [models, setModels] = useState<Models[] | null | undefined>(null);

    const getModels = async (page_size: number = 8) => {
        try {
            const res = await fetch('https://api.kemuri.top/v1/models', {
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
            if(data.length) {
                setModels(data);
            } else {
                setModels(null);
            }
        } catch (error) {
            console.error("Error while fetchin models..", error);
            setModels(undefined)
        }
    }


    useEffect(() => {
        getModels();
    }, [page])

    return models;
}