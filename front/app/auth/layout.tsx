"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getCurrentUser from "../api/user";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: currentUser } = useQuery(["currentUser"], () =>
    getCurrentUser()
  );
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  return <>{children}</>;
}
