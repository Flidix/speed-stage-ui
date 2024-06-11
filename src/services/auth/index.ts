import { $api } from "@/http";
import { setToken, setProjectId } from "../cookies";

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
