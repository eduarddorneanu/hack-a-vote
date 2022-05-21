import { useContract, useProvider } from "wagmi";
import CustomContractJson from "../abis/contract-abi.json";

export const useVTSContract = () => {
  const provider = useProvider();
  return useContract({
    addressOrName: "0xa8c66fEaAeAEE46F6595d6A45Ea87e321DbF25eF",
    contractInterface: CustomContractJson,
    signerOrProvider: provider,
  });
};
