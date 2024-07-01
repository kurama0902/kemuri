import { useEffect, useState } from "react";
import { Loras, Models } from "../types/types";


export const useGetSearchedData = (query: string, version: string, type: string): readonly Models[] | readonly Loras[] => {

    let timer: NodeJS.Timeout;

    const [searchedData, setSearchedData] = useState<Models[] | Loras[]>([]);

    const getData = () => {
        if (version && type) {
            timer = setTimeout(async () => {
                try {
                    const res = await fetch(`https://api.kemuri.top/v1/search?query=${query}&version=${version}&type=${type}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })

                    const data = await res.json();

                    setSearchedData(data);
                } catch (error) {
                    console.error("Fetching searched data error", error);
                }
            }, 300)
        }
    }

    useEffect(() => {
        getData();

        return () => {
            clearTimeout(timer);
        }
    }, [query, version])

    return searchedData;
}