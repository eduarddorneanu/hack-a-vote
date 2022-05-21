import {
  Center,
  Heading,
  Text,
  VStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";

const IndexPage = () => {
  return (
    <Layout title="Hack-A-Vote" Navbar={<Navbar />}>
      <Center width="100vw" height="calc(100vh - 64px)">
        <VStack
          borderRadius="lg"
          shadow="md"
          bg="purple.700"
          padding={5}
          width="700px"
        >
          <Heading>Hack-A-Vote</Heading>
          <Text fontSize="md">
            Your friendly and accessible Hackaton Voting App on Blockchain
          </Text>
          <Text fontSize="xs" color="gray.500" textAlign="center">
            Participate in exciting hackatons, win prizes, demonstrate your
            blockend skills, discover exciting projects, meet talented
            developers, collaborate with other teams, contribute to the growth
            of blockchain
          </Text>
          <Link passHref href="/hackatons">
            <Button
              bg="accent"
              color="white"
              _hover={{
                filter: "brightness(120%)",
                transition: "all .3s",
              }}
              css={{ marginTop: "30px !important" }}
            >
              Browse the hackatons
            </Button>
          </Link>
        </VStack>
      </Center>
    </Layout>
  );
};

export default IndexPage;
