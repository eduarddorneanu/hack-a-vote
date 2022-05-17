import { ChakraProvider } from "@chakra-ui/react";
import { Provider as WagmiProvider } from "wagmi";
import theme from "../theme";
import { wagmiClient } from "../utils/config";

export const GlobalProvider: React.FC = ({ children }) => (
  <WagmiProvider client={wagmiClient}>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </WagmiProvider>
);
