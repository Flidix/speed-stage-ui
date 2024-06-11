import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// const { get } = cookies();

// $api.interceptors.request.use((config: any) => {
//   config.headers.Authorization = `Bearer ${get("token")?.value}`;
//   return config;
// });
