const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
const ENPOINT = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

export const getListPhotos = async (perPage: number, page: number) => {
    const response = await fetch(
        `${ENPOINT}/photos?client_id=${client_id}&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching list photos");
    }

    return response.json();
};

export const getUserInfo = async (username: string) => {
    const response = await fetch(
        `${ENPOINT}/users/${username}?client_id=${client_id}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching user information");
    }

    return response.json();
};

export const getUserPhotos = async (
    username: string,
    perPage: number,
    page: number
) => {
    const response = await fetch(
        `${ENPOINT}/users/${username}/photos?client_id=${client_id}&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching user's photos");
    }

    return response.json();
};

export const getListCollections = async (perPage: number, page: number) => {
    const response = await fetch(
        `${ENPOINT}/collections?client_id=${client_id}&per_page=${perPage}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching collections list");
    }

    return response.json();
};

export const getCollections = async (slug: string) => {
    const response = await fetch(
        `${ENPOINT}/collections/${slug}?client_id=${client_id}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching user's collections");
    }

    return response.json();
};

export const getPhotoCollection = async (slug: string) => {
    const response = await fetch(
        `${ENPOINT}/collections/${slug}/photos?client_id=${client_id}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching photos collection");
    }

    return response.json();
};

export const getRelatedCollections = async (slug: string) => {
    const response = await fetch(
        `${ENPOINT}/collections/${slug}/related?client_id=${client_id}`
    );

    if (!response.ok) {
        throw new Error("Failed fetching collections related");
    }

    return response.json();
};

export const getImageDetail = async (id: string) => {
    const response = await fetch(
        `${ENPOINT}/photos/${id}?client_id=${client_id}`
    );

    if (!response.ok) {
        throw new Error("Error fetching image detail");
    }

    return response.json();
};
