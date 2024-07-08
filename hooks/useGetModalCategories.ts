import { useEffect, useState } from "react"

export const useGetModalCategories = (type: string) => {
    const [categories, setCategories] = useState<string[]>([]);

    const fetchData = async () => {
        try {
            const res = await fetch('https://api.kemuri.top/modal/category', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({type})
            })

            const data = await res.json();

            setCategories(data);
        } catch (error) {
            console.error("Error while fetching modal categories", error);
            
        }
    }

    useEffect(() => {
        fetchData();
    }, [type])

    return categories;
}