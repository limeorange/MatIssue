import Header from "../components/header/Header";
import { getCurrentUserSS } from "../action/getCurrentUser";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialCurrentUser = await getCurrentUserSS();

  return (
    <>
      <Header initialCurrentUser={initialCurrentUser} />
      <main>{children}</main>
    </>
  );
}
