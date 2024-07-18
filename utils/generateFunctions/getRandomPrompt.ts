import { Dispatch, MutableRefObject, SetStateAction } from "react";

export const getRandomPrompt = async (
    type: string,
    selectedModel: {
        modelName: string;
        category: string;
    },
    promptText: MutableRefObject<string>,
    textAreaRef: MutableRefObject<HTMLTextAreaElement | null>,
    setCharactersCount: Dispatch<SetStateAction<number>>
) => {
    try {
        const res = await fetch('https://api.kemuri.top/gen/random', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type
            })
        })

        let text = await res.json();

        if (textAreaRef.current !== null && selectedModel.modelName !== 'select model') {
            if (text.length > 450) {
                text = text.slice(0, 450)
            }

            textAreaRef.current.value = text;
            promptText.current = text;

            setCharactersCount(text.length);
        }

    } catch (error) {
        console.error('Error while creating random prompt', error);

    }
}
