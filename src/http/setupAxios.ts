import axios, {AxiosInstance} from 'axios'
import TokenService from "@/services/UtilServices.ts";

export const API_BASE_URL = 'http://10.10.50.70:8080/api'

const API:AxiosInstance = axios.create({
    withCredentials: false,
    baseURL: API_BASE_URL
})

API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${TokenService.getToken()}`;
    return config;
})

export default API;