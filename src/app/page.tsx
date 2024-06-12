"use client";

import Home from "@/components/home";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function HomePage() {
  useEffect(() => {
    const token = Cookies.get("token");
    const projectId = Cookies.get("projectId");

    if (token) {
      localStorage.setItem("token", token);
    }

    if (projectId) {
      localStorage.setItem("projectId", projectId);
    }
  }, []);

  return <Home />;
}
