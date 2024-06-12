"use server";
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
