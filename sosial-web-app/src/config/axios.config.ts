import { cleanEnv } from "@/utils/cleanEnv";
import axios from "axios";

const api = axios.create({
    baseURL: cleanEnv(process.env.NEXT_PUBLIC_API_URL!)
});

api.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle response error
        if (error.response) {
            return Promise.reject(error);
        } else if (error.request) {
            return Promise.reject(error);
        } else {
            return Promise.reject(error);
        }
    }
);

export default api;