const apiKeys = [
    process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID_1,
    process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID_2,
    process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID_3,
];
const ENPOINT = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

let currentApiKeyIndex = 0;

export const getListPhotos = async (perPage: number, page: number) => {
    const response = await fetch(
        `${ENPOINT}/photos?client_id=${apiKeys[currentApiKeyIndex]}&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching list photos");
    }

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getListPhotos(perPage, page);
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

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getUserInfo(username);
    }

    return response.json();
};

export const getUserPhotos = async (
    username: string,
    perPage: number,
    page: number
) => {
    const response = await fetch(
        `${ENPOINT}/users/${username}/photos?client_id=${apiKeys[currentApiKeyIndex]}&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching user's photos");
    }

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getUserPhotos(username, perPage, page);
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

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
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

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getCollections(slug);
    }

    return response.json();
};

export const getPhotoCollection = async (slug: string) => {
    const response = await fetch(
        `${ENPOINT}/collections/${slug}/photos?client_id=${apiKeys[currentApiKeyIndex]}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching photos collection");
    }

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getPhotoCollection(slug);
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

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getRelatedCollections(slug);
    }

    return response.json();
};

export const getImageDetail = async (id: string) => {
    const response = await fetch(
        `${ENPOINT}/photos/${id}?client_id=${apiKeys[currentApiKeyIndex]}`
    );

    if (!response.ok) {
        throw new Error("Error fetching image detail");
    }

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getImageDetail(id);
    }

    return response.json();
};

export const getSearchPhotos = async (
    query: string,
    perPage: number,
    page: number
) => {
    const response = await fetch(
        `${ENPOINT}/search/photos?query=${query}&client_id=${apiKeys[currentApiKeyIndex]}&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Error fetching search photos");
    }

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getSearchPhotos(query, perPage, page);
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

    if (response.status === 401) {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        getSearchCollections(query, perPage, page);
    }

    return response.json();
};
