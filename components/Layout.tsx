import React, { ReactNode } from "react";
import Head from "next/head";
import { ColorModeScript, theme } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
  title?: string;
  Navbar?: ReactNode;
  Footer?: ReactNode;
};

const Layout: React.FC<Props> = ({
  children,
  title = "This is the default title",
  Navbar,
  Footer,
}) => (
  <div>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>{Navbar}</header>
    {children}
    <footer>{Footer}</footer>
  </div>
);

export default Layout;
