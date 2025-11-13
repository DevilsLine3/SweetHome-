import axios from "axios";

// Normaliza la URL de la API: si se provee VITE_API_URL y no termina en '/api', la añade.
const raw = import.meta.env.VITE_API_URL;
let base = '/api';
if (raw) {
  base = raw.endsWith('/api') ? raw : raw.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL: base,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
