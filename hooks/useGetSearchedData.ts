import { useEffect, useState } from "react";
import { Loras, Models } from "../types/types";


export const useGetSearchedData = (query: string, version: string, subCtg = '', type: string): Models[] | Loras[] => {

    let timer: NodeJS.Timeout;

    const [searchedData, setSearchedData] = useState<Models[] | Loras[]>([]);

    console.log(query, 'query');
    console.log(version, 'version');
    console.log(subCtg, 'subCtg');
    console.log(type, 'type');


    const getData = () => {
        if (type) {
            timer = setTimeout(async () => {
                try {
                    const res = await fetch('https://api.kemuri.top/modal/search', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(type === 'models' ? { models: subCtg, query } : { loras: subCtg, lora_type: version, query })
                    })
                    const data = await res.json();

                    setSearchedData(data)

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
    }, [query, version, subCtg])

    return searchedData;
}