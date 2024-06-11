import React from "react";
import { useRouter } from "next/navigation";

const Auth = () => {
  const { push } = useRouter();

  const goToLogin = () => {
    push("/auth/login");
  };

  const goToCreateProject = () => {
    push("/auth/create-project");
  };
  return (
    <div className="w-screen h-screen flex lg:flex-row flex-col gap-[5%] justify-center items-center bg-customBlack pt-10">
      <div
        onClick={goToLogin}
        className="w-6/12 lg:w-3/12 h-1/4 flex justify-center items-center bg-white rounded transition-transform duration-300 cursor-pointer hover:bg-customBlack hover:border hover:border-borderGray hover:text-white hover:scale-105"
      >
        <h2 className="scroll-m-20 border-b pb-2 text-[1.8rem] font-semibold tracking-tight first:mt-0">
          Login
        </h2>
      </div>
      <div
        onClick={goToCreateProject}
        className="w-6/12 lg:w-3/12 h-1/4 flex justify-center items-center bg-white rounded transition-transform duration-300 cursor-pointer hover:bg-customBlack hover:border hover:border-borderGray hover:text-white hover:scale-105"
      >
        <h2 className="scroll-m-20 border-b pb-2 text-[1.8rem] text-center font-semibold tracking-tight first:mt-0">
          Create Project
        </h2>
      </div>
    </div>
  );
};

export default Auth;
