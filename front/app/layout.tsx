import ToasterContext from "./context/ToasterContext";
import StyledComponentsRegistry from "./libs/registry";

import "./globals.css";
import Recoil from "./context/RecoilContext";
import ReactQuery from "./context/ReactQueryContext";
import Script from "next/script";

export const metadata = {
  title: "맛이슈",
  description: "자신만의 레시피를 올리고 공유하는 플랫폼 입니다.",
  openGraph: {
    title: "맛이슈",
    description: "자신만의 레시피를 올리고 공유하는 플랫폼 입니다.",
    images: "https://eliceproject.s3.amazonaws.com/20230609163939760_og.jpg",
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <StyledComponentsRegistry>
        <body>
          <ToasterContext />
          <Recoil>
            <ReactQuery>{children}</ReactQuery>
          </Recoil>
        </body>
        <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      </StyledComponentsRegistry>
    </html>
  );
}
