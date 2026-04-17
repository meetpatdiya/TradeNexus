import axios from "axios";
let accessToken = null;

export const setToken = (token) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      const res = await api.post("/refresh");
 setToken(res.data.accessToken); 
      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original);
    }

    return Promise.reject(err);
  }
);

export default api;