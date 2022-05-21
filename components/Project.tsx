import {
  Box,
  Button,
  Heading,
  HStack,
  Center,
  Text,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { IProject } from "../utils/types";

interface ProjectProps {
  project: IProject;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  return (
    <VStack margin="30px !important">
      <WrapItem
        bg="blue.700"
        p={7}
        borderRadius="lg"
        width="280px"
        height="150px"
        color="white"
        sx={{
          perspective: "800px",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        _hover={{
          transform: "rotateY(180deg)",
        }}
      >
        <Box
          sx={{
            backfaceVisibility: "hidden",
          }}
        >
          <Heading fontSize="2xl">{project.projectName}</Heading>
          <Text fontSize="md">Address: {project.smartContractAddr}</Text>
          <Text fontSize="md" fontWeight={700}>
            Votes: {project.numberOfVotes}
          </Text>
        </Box>
        <Center
          sx={{
            position: "absolute",
            top: "10px",
            right: "0",
            paddingLeft: "20px",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <Text fontSize="sm">{project.projectDescription}</Text>
        </Center>
      </WrapItem>
      <HStack justifyContent="space-between" color="white">
        <Button bgColor="accent">Vote</Button>
        <Button bgColor="accent">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={project.frontEndURL}
          >
            Visit website
          </a>
        </Button>
      </HStack>
    </VStack>
  );
};

export default Project;
