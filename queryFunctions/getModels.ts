type Models = {
    modelCategory: string,
    modelImage: string,
    modelName: string
}

export const getModels = async ({ queryKey }: { queryKey: (number | string)[]}): Promise<Models[]> => {

    const [, page, page_size] = queryKey;

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

    return data;
}