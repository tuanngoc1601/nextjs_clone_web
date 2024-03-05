import { createAxiosBaseUrl } from "../axios";

const axiosClient = createAxiosBaseUrl();

const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;

export const getPhotos = () => {
    return axiosClient.get(`/photos?client_id=${clientId}`);
};
