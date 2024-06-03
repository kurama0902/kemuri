import { useEffect, useState } from "react";

type Models = {
    modelCategory: string,
    modelImage: string,
    modelName: string
}

export const useGetModels = (page: number): Models[] | null  => {

    const [models, setModels] = useState<Models[] | null>(null);

    const getModels = async (page_size: number = 8) => {
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
        setModels(data);
    }


    useEffect(() => {
        getModels();
    }, [page])

    return models;
}