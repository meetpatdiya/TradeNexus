import axios from "axios";

let accessToken = null;

export const setToken = (token) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: "https://tradenexus-backend.onrender.com",
  withCredentials: true,
});

// Attach access token
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle 401
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    // ❗ prevent infinite loop + skip refresh endpoint itself
    if (
      err.response?.status === 401 &&
      !original._retry &&
      original.url !== "/refresh"
    ) {
      original._retry = true;

      try {
        const res = await api.post("/refresh"); // uses cookie
        setToken(res.data.accessToken);

        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(original);
      } catch (refreshError) {
        accessToken = null;
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;