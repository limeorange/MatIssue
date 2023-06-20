import UserNavBar from "@/app/components/user-page/UserNavBar";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const userProfileId = params.id;
  return (
    <>
      <UserNavBar userProfileId={userProfileId} />
      {children}
    </>
  );
}
