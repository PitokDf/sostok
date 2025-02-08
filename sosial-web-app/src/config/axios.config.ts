import { cleanEnv } from "@/utils/cleanEnv";
import axios from "axios";

const api = axios.create({
    baseURL: cleanEnv(process.env.NEXT_PUBLIC_API_URL!),
    withCredentials: true
});


export default api;