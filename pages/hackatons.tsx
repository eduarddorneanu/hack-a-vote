import {
  Heading,
  HStack,
  Center,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import HackatonsList from "../components/HackatonsList";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import { useVTSRead } from "../utils/hooks/useVTSRead";
import { HackatonFilters } from "../utils/types";

const HackatonsPage = () => {
  const [hackatonsFilter, setHackatonsFilter] =
    useState<HackatonFilters>("all");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHackatonsFilter(event.target.value as HackatonFilters);
  };

  return (
    <Layout Navbar={<Navbar />}>
      <Center margin={3}>
        <VStack>
          <Heading as="h2" size="xl">
            List of hackatons
          </Heading>
          <HStack>
            <Text fontSize="md">Shown hackatons:</Text>
            <Select size="md" onChange={handleChange}>
              <option value="all">All</option>
              <option value="on-going">On Going</option>
              <option value="future">Future</option>
              <option value="past">Past</option>
            </Select>
          </HStack>
          <HackatonsList filter={hackatonsFilter} />
        </VStack>
      </Center>
    </Layout>
  );
};

export default HackatonsPage;
