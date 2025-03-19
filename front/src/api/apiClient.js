import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
});

apiClient.interceptors.request.use(
    async (config) => {
        // const token = await SecureStore.getItemAsync("userToken");
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
