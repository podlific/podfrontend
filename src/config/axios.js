import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3500/",
  withCredentials: true,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const orginalResquest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      orginalResquest._isRetry = true;
      try {
        await axios.get(`http://localhost:3500/api/refresh`, {
          withCredentials: true,
        });
        return api.request(orginalResquest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);
export default api;
