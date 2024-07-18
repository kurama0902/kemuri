import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";

export const changePromptText = (e: ChangeEvent<HTMLTextAreaElement>, type: string, selectedModel: {
    modelName: string,
    category: string
},
    promptText: MutableRefObject<string>,
    negativePromptText: MutableRefObject<string>,
    setCharactersCount: Dispatch<SetStateAction<number>>,
    setNegativeCharacters: Dispatch<SetStateAction<number>>,
    isBlockedBtn: boolean,
    setIsBlockedBtn: Dispatch<SetStateAction<boolean>>
) => {
    if (selectedModel.modelName !== 'select model') {
        if (type === 'regular') {
            promptText.current = e.target.value;
            setCharactersCount(promptText.current.length);
        } else {
            negativePromptText.current = e.target.value;
            setNegativeCharacters(negativePromptText.current.length);
        }
        if (selectedModel.category === 'general') {

            if (promptText.current.length > 200 || negativePromptText.current.length > 200) {
                if (isBlockedBtn === false) {
                    setIsBlockedBtn((prev) => {
                        return !prev
                    })
                }
            } else {
                if (isBlockedBtn === true) {
                    setIsBlockedBtn((prev) => {
                        return !prev
                    })
                }
            }
        } else {
            if (type === 'regular') {
                promptText.current = e.target.value;
            } else {
                negativePromptText.current = e.target.value;
            }
        }
    } else {
        e.target.value = '';
    }
}