import { Box } from "@chakra-ui/react";
import Blockies from "react-blockies";

interface AvatarProps {
  address: string;
  size: number;
}

const Avatar: React.FC<AvatarProps> = ({ address, size }) => {
  return (
    <Box as="div" borderRadius={30}>
      <Blockies seed={address || "defaultSeed"} size={size} />
    </Box>
  );
};

export default Avatar;
