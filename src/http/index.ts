import { getToken } from "@/services/auth";
import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

const token = Cookies.get("token");

$api.interceptors.request.use((config: any) => {
  config.headers.Cookie = `${token}`;
  return config;
});
