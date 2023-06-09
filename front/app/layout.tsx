import ToasterContext from "./context/ToasterContext";
import StyledComponentsRegistry from "./libs/registry";

import "./globals.css";
import Recoil from "./context/RecoilContext";
import ReactQuery from "./context/ReactQueryContext";

export const metadata = {
  title: "맛이슈",
  description: "자신만의 레시피를 올리고 공유하는 플랫폼 입니다.",
  openGraph: {
    title: "맛이슈",
    description: "자신만의 레시피를 올리고 공유하는 플랫폼 입니다.",
    images: "https://eliceproject.s3.amazonaws.com/20230609163939760_og.jpg",
  },
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
          <Recoil>
            <ReactQuery>{children}</ReactQuery>
          </Recoil>
        </body>
      </StyledComponentsRegistry>
    </html>
  );
}
