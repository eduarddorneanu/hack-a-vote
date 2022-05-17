import { providers } from "ethers";
import { defaultChains, chain, Connector, createClient } from "wagmi";
import { CoinbaseWalletConnector } from "@wagmi/core/connectors/coinbaseWallet";
import { WalletConnectConnector } from "@wagmi/core/connectors/walletConnect";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";

export const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
export const etherscanApiKey = process.env
  .NEXT_PUBLIC_ETHERSCAN_API_KEY as string;
export const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

// Pick chains
export const chains = defaultChains;
export const defaultChain = chain.polygonMumbai;

// Set up connectors
type ConnectorsConfig = { chainId?: number };

const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  return [
    new MetaMaskConnector({
      chains,
    }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "nftgco",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };

const alchemyHttpProvider = (config: ProviderConfig) => {
  return new providers.AlchemyProvider(config.chainId, alchemyId);
};

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider: alchemyHttpProvider,
});
