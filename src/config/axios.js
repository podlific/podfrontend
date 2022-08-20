import axios from "axios";
const api = axios.create({
  baseURL: "https://podbackend.herokuapp.com/",
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
        await axios.get(`https://podbackend.herokuapp.com/api/refresh`, {
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
