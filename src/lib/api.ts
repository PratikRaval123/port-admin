import axios from "axios";

// Create an Axios instance
const api = axios.create({
    // Use relative path to route through Next.js rewrites and avoid CORS
    // Do NOT use the full URL here, or the rewrite will be bypassed
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        // Check if running on the client side
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        if (config.data instanceof FormData) {
            delete config.headers["Content-Type"];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors (optional but recommended)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login or clear token)
            if (typeof window !== "undefined") {
                // Optional: localStorage.removeItem("token");
                // window.location.href = "/auth/signin";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
