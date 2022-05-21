import { Spinner, Text, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useVTSContract } from "../utils/hooks/useVTSContract";
import { useVTSRead } from "../utils/hooks/useVTSRead";
import { mapHackatonToIHackaton } from "../utils/mappers";
import { IHackaton, HackatonFilters } from "../utils/types";
import HackatonItem from "./HackatonItem";

interface HackatonsListProps {
  filter: HackatonFilters;
}

const HackatonsList: React.FC<HackatonsListProps> = ({ filter }) => {
  const [hackatons, setHackatons] = useState<IHackaton[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoading: hackatonsIdCounterLoading, data: hackatonsIdCounter } =
    useVTSRead("hackathonsIdCounter");
  const vtsContract = useVTSContract();

  const fetchHackatons = async () => {
    setIsLoading(true);

    if (hackatonsIdCounter) {
      const hackatonIndex = hackatonsIdCounter.toNumber();

      const hackatons = await Promise.all(
        Array.from({ length: hackatonIndex }, (_, i) => i + 1).map(
          async (index: number): Promise<IHackaton> => {
            const hackaton = await vtsContract.hackathons(index);
            return mapHackatonToIHackaton(hackaton, index);
          }
        )
      );
      setHackatons(hackatons);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (hackatonsIdCounter) {
      fetchHackatons();
    }
  }, [hackatonsIdCounterLoading, hackatonsIdCounter]);

  if (isLoading || hackatonsIdCounterLoading) {
    return <Spinner />;
  }

  const date = new Date();

  const hackatonFilter = (hackaton: IHackaton) => {
    switch (filter) {
      case "all":
        return true;
      case "past":
        return hackaton.endDate < date.getTime();
      case "on-going":
        return (
          hackaton.startDate < date.getTime() &&
          hackaton.endDate > date.getTime()
        );
      case "future":
        return hackaton.startDate > date.getTime();
      default:
        return true;
    }
  };

  return (
    <>
      <Wrap flexDir="column" align="center">
        {hackatons.filter(hackatonFilter).map((hackaton) => (
          <HackatonItem hackaton={hackaton} />
        ))}
      </Wrap>
    </>
  );
};

export default HackatonsList;
