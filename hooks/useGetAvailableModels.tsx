import { useEffect, useState } from "react"

export const useGetAvailableModels = () => {

    const [models, setModels] = useState<string[]>([]);

    const fetchData = async () => {
        const response = await fetch('https://api.kemuri.top/v1/models', {
            method: "GET"
        });

        const result = await response.json();

        const imageModels = [
            ...Object.keys(result.image_models),
            ...Object.keys(result.sd_1_5_models),
            ...Object.keys(result.sdxl_1_0_models)
        ];

        setModels(imageModels);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return models;
}