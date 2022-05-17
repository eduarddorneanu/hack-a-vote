import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  StackDivider,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import { useConnect } from "wagmi";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WalletProps {
  name: string;
  descripion: string;
  imageName: string;
  imageSize: {
    width: number;
    height: number;
  };
  onClick: () => void;
}

const Wallet: React.FC<WalletProps> = ({
  name,
  descripion,
  imageName,
  imageSize,
  onClick,
}) => (
  <Center flexDirection="column" padding="2" cursor="pointer" onClick={onClick}>
    <Image
      alt="wallet"
      src={`/assets/${imageName}.svg`}
      height={imageSize.height}
      width={imageSize.width}
    />
    <Text fontWeight={700} fontSize="2xl">
      {name}
    </Text>
    <Text fontWeight={400} color={useColorModeValue("black.300", "gray.200")}>
      {descripion}
    </Text>
  </Center>
);

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { error, connect, connectors, isConnected } = useConnect();

  const connectToWallet = (
    wallet: "MetaMask" | "WalletConnect" | "CoinbaseWallet"
  ) => {
    if (!isConnected) {
      switch (wallet) {
        case "MetaMask":
          connect(connectors[0]);
          break;
        case "WalletConnect":
          connect(connectors[1]);
          break;
        case "CoinbaseWallet":
          connect(connectors[2]);
          break;
        default:
          connect(connectors[0]);
          break;
      }
    }
  };

  useEffect(() => {
    if (isConnected) {
      onClose();
    }
  }, [isConnected, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding={0}>
          <VStack
            pt={4}
            pb={4}
            divider={<StackDivider borderColor="gray.200" />}
          >
            <Wallet
              name="MetaMask"
              imageName="metamask"
              imageSize={{
                height: 40,
                width: 40,
              }}
              descripion="Connect to your MetaMask Wallet"
              onClick={() => {
                connectToWallet("MetaMask");
              }}
            />
            <Wallet
              name="Wallet Connect"
              imageName="walletconnect"
              imageSize={{
                height: 70,
                width: 70,
              }}
              descripion="Scan with WalletConnect to connect"
              onClick={() => {
                connectToWallet("WalletConnect");
              }}
            />
            <Wallet
              name="Coinbase Wallet"
              imageName="coinbase"
              imageSize={{
                height: 80,
                width: 80,
              }}
              onClick={() => {
                connectToWallet("CoinbaseWallet");
              }}
              descripion="Connect to your Coinbase Wallet"
            />
            {error && error.message && (
              <Text color="red.500" pb={3} pt={2} fontWeight={700}>
                {error.message}
              </Text>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
