export type ModalContextType = {
    visibility: { modalName: string, isShow: boolean } | null;
    changeVisibility: (state: { modalName: string, isShow: boolean } | null) => void,
    selectedModel?: string;
    selectModel?: ({ modelName, category }: { modelName: string, category: string }) => void,
    selectLoras?: ({ lora, version }: { lora: string, version: string }) => void,
    selectedLoras?: {
        loras: string[],
        version: string
    }
}