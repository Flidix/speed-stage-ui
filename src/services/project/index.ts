import { $api } from "@/http";

export const fetchCreateProject = async () => {
  try {
    const { data } = await $api.post<{ token: string; projectId: string }>(
      "/project"
    );

		localStorage.setItem("projectId", data.projectId)


    return data;
  } catch (e: any) {
    throw new Error(`${e?.response?.data?.message}`);
  }
};
