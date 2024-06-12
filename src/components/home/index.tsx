import { $api } from "@/http";
import { getProjectId } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import FullScreenSpinner from "../ui/spinners/full-screen-spinner";
import ProjectList from "../project-list";
import Link from "next/link";

const Home = () => {
  const [projectId, setProjectId] = React.useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProjectId(localStorage.getItem("projectId"));
      console.log(projectId, "jdfjldk");
    }
  }, [projectId]);

  const { data, isPending } = useQuery({
    queryKey: ["project"],
    enabled: projectId !== null,
    queryFn: async () => {
      const res = await $api.get<TProject>("/project/" + projectId);
      return res.data;
    },
  });

  if (isPending) return <FullScreenSpinner />;

  console.log(data);

  if (!data?.endPoints?.length) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h3 className="scroll-m-20 text-white text-center text-2xl font-semibold tracking-tight">
          You don&apos;t have any end points! try creating one with this{" "}
          <Link className="underline" href="/docs">
            docs
          </Link>
        </h3>
      </div>
    );
  }
  return (
    <div>
      <ProjectList />
    </div>
  );
};

export default Home;
