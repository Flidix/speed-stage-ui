"use client";
import CreateProject from "@/components/auth/create-project";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const CreateProjectPage = () => {
  return (
    <div>
      <CreateProject />
    </div>
  );
};

export default CreateProjectPage;
