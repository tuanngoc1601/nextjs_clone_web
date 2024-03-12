const client_id = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
const ENPOINT = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

export const getListPhotos = async (perPage: any, page: any) => {
    try {
        const response = await fetch(
            `${ENPOINT}/photos?client_id=${client_id}&per_page=${perPage}&page=${page}`
        );

        if (!response.ok) {
            throw new Error("Failed fetching list photos");
        }

        const loadData = response.json();

        return loadData;
    } catch (err) {
        console.error("Error fetching data:", err);
    }
};

export const getUserInfo = async (username: string) => {
    try {
        const response = await fetch(
            `${ENPOINT}/users/${username}?client_id=${client_id}`
        );

        if (!response.ok) {
            throw new Error("Failed fetching user information");
        }

        const userInfo = response.json();

        return userInfo;
    } catch (err) {
        console.error("Error fetching data:", err);
    }
};

export const getUserPhotos = async (
    username: string,
    perPage: any,
    page: any
) => {
    try {
        const response = await fetch(
            `${ENPOINT}/users/${username}/photos?client_id=${client_id}&per_page=${perPage}&page=${page}`
        );

        if (!response.ok) {
            throw new Error("Failed fetching user's photos");
        }

        const userPhotos = response.json();

        return userPhotos;
    } catch (err) {
        console.error("Failed fetching user's photos", err);
    }
};

export const getListCollections = async (perPage: any, page: any) => {
    try {
        const response = await fetch(
            `${ENPOINT}/collections?client_id=${client_id}&per_page=${perPage}&page=${page}`
        );

        if (!response.ok) {
            throw new Error("Failed fetching collections list");
        }

        const collectionData = response.json();

        return collectionData;
    } catch (err) {
        console.error("Failed fetching collections list", err);
    }
};

export const getUserCollections = async (slug: string) => {
    try {
        const response = await fetch(
            `${ENPOINT}/collections/${slug}?client_id=${client_id}`
        );

        if (!response.ok) {
            throw new Error("Failed fetching user's collections");
        }

        const userColletions = response.json();

        return userColletions;
    } catch (err) {
        console.error("Failed fetching user's collections", err);
    }
};

export const getPhotoCollection = async (slug: string) => {
    try {
        const response = await fetch(
            `${ENPOINT}/collections/${slug}/photos?client_id=${client_id}`
        );

        if (!response.ok) {
            throw new Error("Failed fetching photos collection");
        }

        const collectionPhotos = response.json();

        return collectionPhotos;
    } catch (err) {
        console.error("Failed fetching photos collection", err);
    }
};

export const getRelatedCollections = async (slug: string) => {
    try {
        const response = await fetch(
            `${ENPOINT}/collections/${slug}/related?client_id=${client_id}`
        );

        if (!response.ok) {
            throw new Error("Failed fetching collections related");
        }

        const collectionRelated = response.json();

        return collectionRelated;
    } catch (err) {
        console.error("Failed fetching collection related", err);
    }
};

export const getImageDetail = async (slug: string) => {
    try {
        const response = await fetch(
            `${ENPOINT}/photos/${slug}?client_id=${client_id}`
        );

        if (!response.ok) {
            throw new Error("Error fetching image detail");
        }

        const imageDetail = response.json();

        return imageDetail;
    } catch (err) {
        console.error("Failed fetching image detail", err);
    }
};
