export type ModalContextType = {
    visibility: { modalName: string, isShow: boolean } | null;
    changeVisibility: (state: { modalName: string, isShow: boolean } | null) => void,
    selectedModel?: string;
    selectModel?: ({ modelName, category }: { modelName: string, category: string }) => void,
    selectLoras?: ({ lora, category }: { lora: string, category: string }) => void,
    selectedLoras?: {
        loras: string[],
        category: string
    }
}