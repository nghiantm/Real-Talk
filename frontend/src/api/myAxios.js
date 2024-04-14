import axios from "axios";

export const myAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
})

export const pyAxios = axios.create({
    baseURL: import.meta.env.VITE_FLASK_API_BASE,
})