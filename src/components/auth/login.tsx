"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  AuthFormValue,
  AuthValidationSchema,
} from "@/validation/auth-validation";
import MyInput from "../ui/my-input.tsx";
import MyButton from "../ui/my-button.tsx/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchLogin } from "@/services/auth/index";
import { useRouter } from "next/navigation";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AuthValidationSchema),
  });

  const { push } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AuthFormValue) => fetchLogin(data.projectId, data.token),
    onError: (error: Error) => {
      toast(`${error.message}`);
    },
    onSuccess: (data) => {
      push("/");
    },
  });

  const onSubmit = (data: AuthFormValue) => {
    mutate(data);
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-[5%] justify-center items-center bg-customBlack pt-10">
      <h2 className="scroll-m-20 border-b pb-2 text-white text-3xl font-semibold tracking-tight first:mt-0">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 space-y-6">
        <div>
          <h3 className="scroll-m-20 border-b pb-2 text-white text-2xl font-semibold tracking-tight first:mt-0">
            Project ID
          </h3>
          <Controller
            name="projectId"
            control={control}
            render={({ field }) => <MyInput {...field} />}
          />
          {errors.projectId && (
            <p className="text-red-500 mt-2">{errors.projectId.message}</p>
          )}
        </div>
        <div>
          <h3 className="scroll-m-20 border-b pb-2 text-white text-2xl font-semibold tracking-tight first:mt-0">
            Token
          </h3>
          <Controller
            name="token"
            control={control}
            render={({ field }) => <MyInput {...field} />}
          />
          {errors.token && (
            <p className="text-red-500 mt-2">{errors.token.message}</p>
          )}
        </div>
        <MyButton isLoading={isPending} variant={"secondary"} type="submit">
          Submit
        </MyButton>
      </form>
    </div>
  );
};

export default Login;
