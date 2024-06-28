import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Loras, Models } from "../types/types";

let flag = false;

export const getSearchedData = (el: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, version: string, type: string, setSearchedData: Dispatch<SetStateAction<Models[] | Loras[]>>) => {

    if (version && type && !flag) {
        flag = true
        setTimeout(async () => {
            if (el.target.value.length > 0) {
                try {
                    const res = await fetch(`https://api.kemuri.top/v1/search?query=${el.target.value}&version=${version}&type=${type}`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })

                    const data = await res.json();

                    setSearchedData(data);
                    flag = false;
                } catch (error) {
                    console.error("Fetching searched data error", error);
                }
            } else {
                flag = false;
            }
        }, 400)
    }
}