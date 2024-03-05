import axios from "axios";

export const createAxiosBaseUrl = () => {
    return axios.create({
        baseURL: "https://api.unsplash.com",
        withCredentials: true,
    });
};
