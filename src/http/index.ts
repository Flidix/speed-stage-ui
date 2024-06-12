import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

$api.interceptors.request.use((config: any) => {
  const token = getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

