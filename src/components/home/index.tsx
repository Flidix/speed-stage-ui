import { $api } from "@/http";
import { getProjectId } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FullScreenSpinner from "../ui/spinners/full-screen-spinner";
import ProjectList from "../project-list";

const Home = () => {
  const projectId = getProjectId();

  const { data, isPending } = useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const res = await $api.get<TProject>("/project/" + projectId);
      return res.data;
    },
  });

  if (isPending) return <FullScreenSpinner />;
  return (
    <div>
      <ProjectList />
    </div>
  );
};

export default Home;
