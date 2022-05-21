import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Hackaton } from "../utils/types";
import Link from "next/link";

interface HackatonItemProps {
  hackaton: Hackaton;
}

const HackatonItem: React.FC<HackatonItemProps> = ({ hackaton }) => {
  const {
    id,
    name,
    startDate,
    description,
    voteEnd,
    endDate,
    numberOfProjects,
    owner,
  } = hackaton;
  const _startDate = new Date(startDate);
  const _endDate = new Date(endDate);
  const _voteEndDate = new Date(voteEnd);
  const date = new Date();

  let status = "";

  if (_startDate > date) {
    status = `Starting at ${_startDate.toLocaleDateString()} ${_startDate.toLocaleTimeString()}`;
  } else if (_startDate < date && date < _endDate) {
    status = `Running, ends at ${_endDate.toLocaleDateString()} ${_endDate.toLocaleTimeString()}`;
  } else if (_endDate < date && date < _voteEndDate) {
    status = `Voting, ends at ${_voteEndDate.toLocaleDateString()} ${_voteEndDate.toLocaleTimeString()}`;
  } else if (_voteEndDate < date) {
    status = "Voting ended, winner announced";
  }

  return (
    <Box
      shadow="lg"
      padding={5}
      margin="30px !important"
      borderRadius="md"
      bg={useColorModeValue("gray.200", "gray.700")}
    >
      <Heading fontSize="xl">
        {name}{" "}
        <Text as="sub" fontSize="md" fontWeight="400">
          {" "}
          by {owner}
        </Text>
      </Heading>
      <Text fontSize="sm" marginTop={3} color="gray.500">
        {description}
      </Text>
      <Text marginTop={5}>Number of projects: {numberOfProjects}</Text>
      <Text>Status: {status}</Text>
      <Center>
        <Link passHref href={`/hackatons/${id}`}>
          <Button
            bg="accent"
            color="white"
            _hover={{
              filter: "brightness(120%)",
              transition: "all .3s",
            }}
            marginTop={3}
          >
            Vote or participate
          </Button>
        </Link>
      </Center>
    </Box>
  );
};

export default HackatonItem;
