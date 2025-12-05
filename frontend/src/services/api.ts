// api.ts

import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_URL // Ex: http://localhost:3333
});