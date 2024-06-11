import { $api } from "@/http";
import { setProjectId, setToken } from "../auth";

export const fetchCreateProject = async () => {
  try {
    const { data } = await $api.post<{ token: string; projectId: string }>(
      "/project"
    );

    setToken(data.token);
    setProjectId(data.projectId);

    return data;
  } catch (e: any) {
    throw new Error(`${e?.response?.data?.message}`);
  }
};
