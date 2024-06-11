import { fetchCreateProject } from "@/services/project";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import Spinner from "../ui/spinners";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CopyableText from "../copyable-text";
import MyButton from "../ui/my-button.tsx/index";

const CreateProject = () => {
  const { push } = useRouter();
  const { data, isPending, mutate } = useMutation({
    mutationFn: fetchCreateProject,
    onError: (error: Error) => {
      toast(error.message);
      push("/auth");
    },
  });

  React.useEffect(() => {
    mutate();
  }, [mutate]);

  const gotToNext = () => {
    push("/");
  };

  if (isPending || !data) {
    return (
      <div className="w-screen bg-customBlack h-screen flex justify-center items-center absolute">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-[5%] justify-center items-center bg-customBlack pt-10">
      <h2 className="scroll-m-20 border-b pb-2 text-white text-3xl font-semibold tracking-tight first:mt-0">
        Your project data
      </h2>
      <div className="w-[80vw] break-words">
        <h3 className="scroll-m-20 border-b pb-2 text-white text-2xl font-semibold tracking-tight first:mt-0">
          Project ID
        </h3>
        <CopyableText text={data?.projectId} />
      </div>
      <div className="w-[80vw] break-words">
        <h3 className="scroll-m-20 border-b pb-2 text-white text-2xl font-semibold tracking-tight first:mt-0">
          Token
        </h3>
        <CopyableText maxLength={40} text={data?.token} />
      </div>
      <MyButton variant={"secondary"} onClick={gotToNext}>
        Next
      </MyButton>
    </div>
  );
};

export default CreateProject;
