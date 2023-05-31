import getCurrentUser from "../actions/getCurrentUser";
import Header from "../components/header/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header currentUser={currentUser} />
      <main className="pb-20 pt-[131px]">{children}</main>
    </>
  );
}
