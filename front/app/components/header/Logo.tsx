"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      style={{ cursor: "pointer" }}
      src="/images/logo1.png"
      height="40"
      width="133"
      alt="Logo"
    />
  );
};

export default Logo;
