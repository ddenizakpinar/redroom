import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/redroom-809d5/us-central1/api",
});

instance.interceptors.request.use(
  async (config) => {
    const value = localStorage.getItem("token");
    config.headers = {
      Authorization: `Bearer ${value}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      window.location.href = "login";
      originalRequest._retry = true;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
