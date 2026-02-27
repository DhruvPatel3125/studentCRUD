import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);



axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optional: logout / redirect logic
    }
    // Return the response data for 400 errors so components can access Joi messages
    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient;


