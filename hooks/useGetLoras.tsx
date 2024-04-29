import { useEffect, useState } from "react"

export const useGetLoras = () => {

    const [loras, setLoras] = useState<object[]>([]);

    const fetchData = async () => {
        const response = await fetch('https://api.kemuri.top/v1/lora', {
            method: "GET"
        });

        const result = await response.json();

        const loras = [
            {sd_loras: Object.values(result.sd_1_5_lores)},
            {sdxl_loras: Object.values(result.sdxl_lores)}
        ];

        setLoras(loras);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return loras;
}