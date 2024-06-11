"use server";
import { $api } from "@/http";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

export const setToken = (token: string) => {
  // Cookies.set("token", token, {
  //   path: "/",
  //   secure: true,
  // });
  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });
};

export const setProjectId = (projectId: string) => {
  // Cookies.set("projectId", projectId, {
  //   path: "/",
  //   secure: true,
  // });
  cookies().set({
    name: "projectId",
    value: projectId,
    httpOnly: true,
    path: "/",
  });
};

export const getToken = () => {
  return cookies().get("token")?.value;
};

export const getProjectId = () => {
  // return Cookies.get("projectId");
  return cookies().get("projectId")?.value;
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
