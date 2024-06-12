import { $api } from "@/http";
import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token");
};

export const getProjectId = () => {
  const projectId = localStorage.getItem("projectId");
  return projectId;
};

export const fetchCheckAuth = async (token: string, projectId: string) => {
  try {
    const { data } = await $api.post<{ token: string; projectId: string }>(
      "/project/auth",
      {
        token,
        projectId,
      }
    );

    return data;
  } catch (e: any) {
    throw new Error(`${e?.response?.data?.message}`);
  }
};

export const fetchLogin = async (projectId: string, token: string) => {
  try {
    const { data } = await $api.post<{ token: string; projectId: string }>(
      "/project/auth",
      {
        token,
        projectId,
      }
    );

    return data;
  } catch (e: any) {
    throw new Error(`${e?.response?.data?.message}`);
  }
};
