import { create } from "zustand";

interface State {
    currentApiKeyIndex: number;
    numberPhotoSearched: number;
    numberCollectionSearched: number;
}

interface Action {
    updateNumberPhoto: (count: number) => void;
    updateNumberCollection: (count: number) => void;
    changeApiKey: (index: number) => void;
}

export const useStore = create<State & Action>((set) => ({
    currentApiKeyIndex: 0,
    numberPhotoSearched: 0,
    numberCollectionSearched: 0,
    updateNumberPhoto: (count: number) =>
        set((state) => ({ ...state, numberPhotoSearched: count })),
    updateNumberCollection: (count: number) =>
        set((state) => ({ ...state, numberCollectionSearched: count })),
    changeApiKey: (index: number) =>
        set((state) => ({ ...state, currentApiKeyIndex: index })),
}));
