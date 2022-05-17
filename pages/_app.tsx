import "@fontsource/archivo/700.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/300.css";

import React from "react";
import { AppProps } from "next/app";
import { GlobalProvider } from "../components/GlobalProvider";

function NFTGCO({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <GlobalProvider>
      <AnyComponent {...pageProps} />
    </GlobalProvider>
  );
}

export default NFTGCO;
