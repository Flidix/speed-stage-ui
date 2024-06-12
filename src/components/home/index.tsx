import { $api } from "@/http";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import FullScreenSpinner from "../ui/spinners/full-screen-spinner";
import ProjectList from "../project-list";
import { cookies } from "next/headers";
import { getProjectId, setProjectId } from "@/services/cookies";

const Home = () => {
  const [projectId, setProjectId] = React.useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setProjectId(getProjectId());
  }, []);

  const { data, isPending } = useQuery({
    queryKey: ["project"],
    enabled: !!projectId,
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
