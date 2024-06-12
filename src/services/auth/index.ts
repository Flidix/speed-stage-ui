"use client";
import { $api } from "@/http";
import Cookies from "js-cookie";

export const setToken = (token: string) => {
  Cookies.set("token", token);
};

export const setProjectId = (projectId: string) => {
  Cookies.set("projectId", projectId);
};

export const getToken = () => {
  const token = Cookies.get("token");
  return token;
};

export const getProjectId = () => {
  const projectId = Cookies.get("projectId");
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

    setToken(data.token);
    setProjectId(data.projectId);

    return data;
  } catch (e: any) {
    console.error("Error in fetchCheckAuth:", e);
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
    console.error("Error in fetchLogin:", e);
    throw new Error(`${e?.response?.data?.message}`);
  }
};
