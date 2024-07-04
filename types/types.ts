export type ModalContextType = {
    visibility: { modalName: string, isShow: boolean } | null;
    changeVisibility: (state: { modalName: string, isShow: boolean } | null) => void,
    selectedModel?: {
        modelName: string,
        category: string
    };
    selectModel?: ({ modelName, category }: { modelName: string, category: string }) => void,
    selectLoras?: ({ lora, version }: { lora: string, version: string }) => void,
    selectedLoras?: {
        loras: string[],
        version: string
    },
    ratioWidth: number,
    ratioHeight: number,
    vae: string,
    samplingMethod: string,
    upscaleMethod: string,
    sampling: number,
    CFG: number,
    upscaleFactor: number
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