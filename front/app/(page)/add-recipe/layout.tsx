"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";
import ConfirmModal from "@/app/components/UI/ConfirmModal";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: currentUser, isLoading } = useQuery<User>(["currentUser"]);

  const router = useRouter();

  if (isLoading) {
    // 로딩 중이라면 아무것도 렌더링하지 않음
    return null;
  }

  const handleLogin = () => {
    router.replace("/auth/login");
  };

  const handleCancel = () => {
    router.replace("/");
  };

  if (!currentUser && !isLoading) {
    return (
      <ConfirmModal
        message="글을 작성하시려면 로그인이 필요합니다."
        onConfirm={handleLogin}
        onCancel={handleCancel}
      />
    );
  }

  return <>{children}</>;
}
