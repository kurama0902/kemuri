import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";

export type ModalContextType = {
    visibility: { modalName: string, isShow: boolean } | null;
    changeVisibility: (state: { modalName: string, isShow: boolean } | null) => void,
    selectedModel: {
        modelName: string,
        category: string
    };
    selectModel: ({ modelName, category }: { modelName: string, category: string }) => void,
    selectLoras: ({ lora, version }: { lora: string, version: string }) => void,
    selectedLoras: {
        loras: string[],
        version: string
    },
    // ratioWidth: number,
    // ratioHeight: number,
    ratio: RatioType,
    setRatio: Dispatch<SetStateAction<RatioType>>,
    vae: string,
    handleSetVae: (vae: string) => void,
    samplingMethod: string,
    handleSetSamplingMethod: (method: string) => void;
    upscaleMethod: string,
    handleSetUpscaleMethod: (method: string) => void;
    sampling: number,
    setSampling: Dispatch<SetStateAction<number>>
    CFG: number,
    setCFG: Dispatch<SetStateAction<number>>,
    upscaleFactor: number
    setUpscaleFactor: Dispatch<SetStateAction<number>>,
    loraWeights: {
        [key: string]: number;
    },
    handleSetLoraWeights: (e: ChangeEvent<HTMLInputElement>, loraName: string) => void
}

export type RatioType = {
    width: number;
    height: number;
    aspectRatio: string
}

export type Loras = {
    name: string,
    image_url: string,
    sensitive: string,
    class: string,
    version: string
}

export type Models = {
    name: string,
    modelCategory: string,
    image_url: string
}

export type Generate = {
    promptText: MutableRefObject<string>,
    negativePromptText: MutableRefObject<string>,
    selectedModel: {
      modelName: string;
      category: string;
    },
    selectedLoras: {
      loras: string[];
      version: string;
    },
    loraWeights: {
      [key: string]: number;
    },
    samplingMethod: string,
    ratio: RatioType,
    sampling: number,
    upscaleFactor: number,
    vae: string,
    CFG: number,
    upscaleMethod: string,
    setIsBlockedBtnAfterPrompt: Dispatch<SetStateAction<boolean>>,
    setSelectedLink: Dispatch<SetStateAction<string | null>>,
    setImagesLinks: Dispatch<SetStateAction<string[]>>,
    setIsShowNotification: Dispatch<SetStateAction<boolean>>
}