import UserNavBar from "@/app/components/user-page/UserNavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserNavBar />
      {children}
    </>
  );
}
