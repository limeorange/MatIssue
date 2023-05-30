import getCurrentUser from "./actions/getCurrentUser";
import Header from "./components/header/Header";

import ToasterContext from "./context/ToasterContext";

import "./globals.css";
import StyledComponentsRegistry from "./libs/registry";

export const metadata = {
  title: "레시피 공유 플랫폼",
  description: "자신만의 레시피를 올리고 공유하는 플랫폼 입니다.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body>
          <ToasterContext />
          <Header currentUser={currentUser} />
          <main className="pb-20 pt-[131px]">{children}</main>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
