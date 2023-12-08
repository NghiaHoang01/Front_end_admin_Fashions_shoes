import axios from "axios";
import { BASE_URL } from "constant/Variable";
import { refreshTokenService } from "service/LoginService";

const request = axios.create({
    withCredentials: true,
    timeout: 60000,
    headers: {
        "Content-Type": "application/json-patch+json",
    },
    baseURL: BASE_URL
})

const handleError = async (error) => {
    const { response = {}, config } = error;
    const { data, status, statusText } = response;
    const originalRequest = config
    if (data.message === 'Access Denied'
        && data.status === 403
        && data.error === 'Forbidden'
        && !originalRequest._retry) {
        originalRequest._retry = true;
        // refresh lai token
        const res = await refreshTokenService()
        if (res.data.status === 500 || !res.data.success) {
            // refresh token het han
            console.log(res.data.message)
            localStorage.removeItem("admin")
        }
        return request(originalRequest);
    }
    return { data, status, statusText };

};

request.interceptors.request.use((config) => {
    if (config.isFormData) {
        delete config.headers['Content-Type']
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

request.interceptors.response.use((response) => {
    return response;
}, handleError);

export default request;