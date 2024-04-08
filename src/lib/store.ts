import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    currentApiKeyIndex: number;
    numberPhotoSearched: number;
    numberCollectionSearched: number;
    accessToken: string;
    likedPhotos: String[];
}

interface Action {
    updateNumberPhoto: (count: number) => void;
    updateNumberCollection: (count: number) => void;
    changeApiKey: (index: number) => void;
    login: (accessToken: string) => void;
    addLikedPhoto: (id: string) => void;
    reset: () => void;
}

const initialState: State = {
    currentApiKeyIndex: 0,
    numberPhotoSearched: 0,
    numberCollectionSearched: 0,
    accessToken: "",
    likedPhotos: [],
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
            addLikedPhoto: (id: string) =>
                set((state) => {
                    if (!state.likedPhotos.includes(id)) {
                        state.likedPhotos.push(id);
                    } else {
                        state.likedPhotos = state.likedPhotos.filter(
                            (liked) => liked !== id
                        );
                    }
                    return state;
                }),
            reset: () => {
                set(initialState);
            },
        }),
        {
            name: "global-storage",
        }
    )
);
