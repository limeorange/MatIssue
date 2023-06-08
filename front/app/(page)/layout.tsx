import Header from "../components/header/Header";
import { getCurrentUserSS } from "../action/getCurrentUser";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUserSS();

  return (
    <>
      <Header currentUser={currentUser} />
      <main>{children}</main>
    </>
  );
}
