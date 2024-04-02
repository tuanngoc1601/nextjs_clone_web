import { useStore } from "@/lib/store";

const apiKeys = [
    process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID_3,
    process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID_1,
    process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID_2,
];
const ENPOINT = process.env.NEXT_PUBLIC_APP_BACKEND_URL;
const SECRET_KEY = process.env.NEXT_PUBLIC_APP_SECRET_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_APP_REDIRECT_URI;
const authorization_code = process.env.NEXT_PUBLIC_APP_AUTHORIZATION_CODE;
const OAUTH_TOKEN_URL = process.env.NEXT_PUBLIC_APP_OAUTH_TOKEN;

const currentApiKeyIndex = useStore.getState().currentApiKeyIndex;
const changeApiKeyIndex = useStore.getState().changeApiKey;

export const getListPhotos = async (
    perPage: number,
    page: number,
    accessToken: string
) => {
    const response = await fetch(
        `${ENPOINT}/photos?per_page=${perPage}&page=${page}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed fetching list photos");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getListPhotos(perPage, page, accessToken);
    }

    return response.json();
};

export const getUserInfo = async (username: string) => {
    const response = await fetch(
        `${ENPOINT}/users/${username}?client_id=${apiKeys[currentApiKeyIndex]}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching user information");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getUserInfo(username);
    }

    return response.json();
};

export const getUserPhotos = async (
    username: string,
    perPage: number,
    page: number,
    accessToken: string
) => {
    const response = await fetch(
        `${ENPOINT}/users/${username}/photos?per_page=${perPage}&page=${page}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed fetching user's photos");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getUserPhotos(username, perPage, page, accessToken);
    }

    return response.json();
};

export const getListCollections = async (perPage: number, page: number) => {
    const response = await fetch(
        `${ENPOINT}/collections?client_id=${apiKeys[currentApiKeyIndex]}&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching collections list");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getListCollections(perPage, page);
    }

    return response.json();
};

export const getCollections = async (slug: string) => {
    const response = await fetch(
        `${ENPOINT}/collections/${slug}?client_id=${apiKeys[currentApiKeyIndex]}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching user's collections");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getCollections(slug);
    }

    return response.json();
};

export const getPhotoCollection = async (slug: string, accessToken: string) => {
    const response = await fetch(`${ENPOINT}/collections/${slug}/photos`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed fetching photos collection");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getPhotoCollection(slug, accessToken);
    }

    return response.json();
};

export const getRelatedCollections = async (slug: string) => {
    const response = await fetch(
        `${ENPOINT}/collections/${slug}/related?client_id=${apiKeys[currentApiKeyIndex]}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching collections related");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getRelatedCollections(slug);
    }

    return response.json();
};

export const getImageDetail = async (id: string, accessToken: string) => {
    const response = await fetch(`${ENPOINT}/photos/${id}`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching image detail");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getImageDetail(id, accessToken);
    }

    return response.json();
};

export const getSearchPhotos = async (
    query: string,
    perPage: number,
    page: number,
    accessToken: string
) => {
    const response = await fetch(
        `${ENPOINT}/search/photos?query=${query}&per_page=${perPage}&page=${page}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Error fetching search photos");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getSearchPhotos(query, perPage, page, accessToken);
    }

    return response.json();
};

export const getSearchCollections = async (
    query: string,
    perPage: number,
    page: number
) => {
    const response = await fetch(
        `${ENPOINT}/search/collections?query=${query}&client_id=${apiKeys[currentApiKeyIndex]}&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Error fetching search collections");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        getSearchCollections(query, perPage, page);
    }

    return response.json();
};

export const loginUser = async () => {
    const response = await fetch(
        `${OAUTH_TOKEN_URL}?client_secret=${SECRET_KEY}&client_id=${apiKeys[currentApiKeyIndex]}&redirect_uri=${REDIRECT_URI}&code=${authorization_code}&grand_type=authorization_code`,
        {
            method: "POST",
        }
    );

    if (!response.ok) {
        throw new Error("Error login request");
    }

    if (response.status === 403) {
        changeApiKeyIndex((currentApiKeyIndex + 1) % apiKeys.length);
        loginUser();
    }

    return response.json();
};

export const likePhoto = async (id: string, accessToken: string) => {
    if (accessToken === "") {
        return {
            status: 401,
            message: "Unauthorized",
        };
    }
    const response = await fetch(`${ENPOINT}/photos/${id}/like`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("The access token is invalid");
    }

    return response.json();
};

export const unlikePhoto = async (id: string, accessToken: string) => {
    if (accessToken === "") {
        return {
            status: 401,
            message: "Unauthorized",
        };
    }

    const response = await fetch(`${ENPOINT}/photos/${id}/like`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    });

    if (!response.ok) {
        throw new Error("The access token is invalid");
    }

    return response.json();
};
