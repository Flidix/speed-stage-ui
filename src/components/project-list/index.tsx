import { useQuery } from "@tanstack/react-query";
import React from "react";
import EndPointItem from "../end-point-item";

const ProjectList = () => {
  const { data } = useQuery<TProject>({
    queryKey: ["project"],
  });
  return (
    <div className="w-screen min-h-screen flex justify-center bg-customBlack">
      {data?.endPoints?.map((endPoint) => {
        return <EndPointItem key={endPoint._id} endPoint={endPoint} />;
      })}
    </div>
  );
};

export default ProjectList;
