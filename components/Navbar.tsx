import {
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Address } from "@web3-ui/components";
import { useAccount, useDisconnect } from "wagmi";
import WalletModal from "./modals/WalletModal";
import AddressAvatar from "./Avatar";
import Link from "next/link";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, isLoading } = useAccount();
  const { disconnect } = useDisconnect();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleWalletDisconnect = () => {
    disconnect();
  };

  const handleWalletConnect = () => {
    onOpen();
  };

  return (
    <Box bg="accent" px={4}>
      <WalletModal isOpen={isOpen} onClose={onClose} />
      <Flex
        h={16}
        pr={5}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontWeight={700} fontSize="2xl" color="white">
          Hack-A-Vote
        </Text>

        <Flex alignItems={"center"}>
          <Link passHref href="/hackatons">
            <Button marginRight="20px">View hackatons</Button>
          </Link>
          <Stack direction={"row"} spacing={7} alignItems="center">
            {isLoading === false && data && data.address && (
              <Address value={data.address} shortened copiable />
            )}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={10}
              >
                <AddressAvatar address={data?.address || ""} size={10} />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <Center>
                  <AddressAvatar address={data?.address || ""} size={30} />
                </Center>
                <Center textAlign="center">
                  {data && data.address ? (
                    <Box>
                      <Address shortened value={data.address} />
                    </Box>
                  ) : (
                    "Connect your wallet"
                  )}
                </Center>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    if (data && data.address) {
                      handleWalletDisconnect();
                    } else {
                      handleWalletConnect();
                    }
                  }}
                >
                  {data && data.address ? "Disconnect" : "Connect to wallet"}
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
