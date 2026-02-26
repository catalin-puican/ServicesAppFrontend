import axios from 'axios';

const API_PORT = import.meta.env.VITE_API_PORT;
const API_HOST = import.meta.env.VITE_API_HOST;
const API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL;
const BASE_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/api`;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 500)
        {
            error.response.data = "Internal server error, please contact the developer.";
            return Promise.reject(error);
        }

        if (error.response?.status === 403)
        {
            error.response.data = "Insufficient permissions"
            return Promise.reject(error);
        }

        // For all other errors, reject with the original error
        return Promise.reject(error);
    }
)

export default axiosInstance;