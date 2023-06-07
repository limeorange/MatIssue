import { getCurrentUserSS } from "../action/getCurrentUser";
import Header from "../components/header/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUserSS();

  console.log(currentUser);
  return (
    <>
      <Header currentUser={currentUser} />
      <main>{children}</main>
    </>
  );
}
