import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Navbar from "../../components/Navbar";
import ParticipateForm from "../../components/ParticipateForm";
import Project from "../../components/Project";
import { useVTSContract } from "../../utils/hooks/useVTSContract";
import {
  mapHackatonToIHackaton,
  mapProjectToIProject,
} from "../../utils/mappers";
import { IHackaton, IProject } from "../../utils/types";

const Hackaton = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [hackaton, setHackaton] = useState<IHackaton>({
    id: 0,
    projects: [],
    name: "",
    owner: "",
    description: "",
    endDate: 0,
    numberOfProjects: 0,
    reward: 0,
    startDate: 0,
    voteEnd: 0,
    voteStart: 0,
  });
  const [projects, setProjects] = useState<IProject[]>([]);

  const vtsContract = useVTSContract();

  const [participateFormShown, setParticipateFormShown] = useState(false);
  const toggleParticipateFormShown = () => {
    setParticipateFormShown(!participateFormShown);
  };

  const fetchProjects = async () => {
    const project = await vtsContract.projects(Number(id), 1);
    console.log(project);
    setProjects([mapProjectToIProject(project, 1)]);
  };

  const fetchHackaton = async () => {
    setIsLoading(true);
    const hackaton = await vtsContract.hackathons(Number(id));
    setHackaton(mapHackatonToIHackaton(hackaton, Number(id)));
    await fetchProjects();
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchHackaton();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Layout Navbar={<Navbar />}>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout Navbar={<Navbar />}>
      <Center>
        <VStack
          p={8}
          borderRadius="lg"
          bg={useColorModeValue("gray.300", "blackAlpha.400")}
          textAlign="left"
          marginTop="3"
        >
          <HStack>
            <Heading>{hackaton.name}</Heading>
          </HStack>
          <HStack>
            <Text fontWeight={700}>Created by:</Text>
            <Text>{hackaton.owner || "owner not set"}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={700}>Description: </Text>
            <Text>{hackaton.description}</Text>
          </HStack>
          <Button
            color="white"
            marginTop="20px !important"
            bg="accent"
            onClick={() => {
              toggleParticipateFormShown();
            }}
          >
            {participateFormShown
              ? "I don't want to participate"
              : "I want to participate"}
          </Button>
          <ParticipateForm isFormShown={participateFormShown} />
          <Divider paddingTop="5" />
          <Heading marginTop="30px !important">List of projects</Heading>
          <Wrap justify="center">
            {projects.length === 0 ? (
              <Heading fontSize="2xl">
                There are no projects registered!
              </Heading>
            ) : (
              projects.map((project) => <Project project={project} />)
            )}
          </Wrap>
        </VStack>
      </Center>
    </Layout>
  );
};

export default Hackaton;
