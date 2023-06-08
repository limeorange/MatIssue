"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";
import NavBar from "../../components/my-page/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: currentUser, isLoading } = useQuery<User>(["currentUser"]);

  const router = useRouter();

  if (isLoading) {
    // 로딩 중이라면 아무것도 렌더링하지 않음
    return null;
  }

  if (!currentUser) {
    // 로그인되어 있지 않은 경우 로그인 페이지로 리다이렉트
    router.replace("/auth/login");
    return null;
  }

  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
