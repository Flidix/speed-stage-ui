import { $api } from "@/http";
import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("token", token, { path: "/" });
};

export const setProjectId = (projectId: string) => {
  Cookies.set("projectId", projectId, { path: "/" });
};

export const getToken = () => {
  return Cookies.get("token");
};

export const getProjectId = () => {
  return Cookies.get("projectId");
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

    setToken(data.token);
    setProjectId(data.projectId);

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

    setToken(data.token);
    setProjectId(data.projectId);

    return data;
  } catch (e: any) {
    throw new Error(`${e?.response?.data?.message}`);
  }
};
