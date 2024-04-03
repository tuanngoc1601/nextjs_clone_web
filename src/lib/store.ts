import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    currentApiKeyIndex: number;
    numberPhotoSearched: number;
    numberCollectionSearched: number;
    accessToken: string;
    isLikePhoto: boolean;
}

interface Action {
    updateNumberPhoto: (count: number) => void;
    updateNumberCollection: (count: number) => void;
    changeApiKey: (index: number) => void;
    login: (accessToken: string) => void;
    updateLikePhoto: (status: boolean) => void;
    reset: () => void;
}

const initialState: State = {
    currentApiKeyIndex: 0,
    numberPhotoSearched: 0,
    numberCollectionSearched: 0,
    accessToken: "d7er9xVpiOb_HowqmbEAM8eGs8whMlJVYmJo3JABSS4",
    isLikePhoto: false,
};

export const useStore = create<
    State & Action,
    [["zustand/persist", State & Action]]
>(
    persist(
        (set) => ({
            ...initialState,
            updateNumberPhoto: (count: number) =>
                set((state) => ({ ...state, numberPhotoSearched: count })),
            updateNumberCollection: (count: number) =>
                set((state) => ({ ...state, numberCollectionSearched: count })),
            changeApiKey: (index: number) =>
                set((state) => ({ ...state, currentApiKeyIndex: index })),
            login: (accessToken: string) =>
                set((state) => ({ ...state, accessToken: accessToken })),
            updateLikePhoto: (status: boolean) =>
                set((state) => ({ ...state, isLikePhoto: status })),
            reset: () => {
                set(initialState);
            },
        }),
        {
            name: "global-storage",
        }
    )
);
