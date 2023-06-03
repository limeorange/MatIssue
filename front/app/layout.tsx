import ToasterContext from "./context/ToasterContext";
import StyledComponentsRegistry from "./libs/registry";

import "./globals.css";

export const metadata = {
  title: "맛이슈",
  description: "자신만의 레시피를 올리고 공유하는 플랫폼 입니다.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body>
          <ToasterContext />
          {children}
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
