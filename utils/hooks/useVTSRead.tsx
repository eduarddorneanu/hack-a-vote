import { useContractRead } from "wagmi";
import ContractAbi from "../abis/contract-abi.json";

export const useVTSRead = (field: string, args?: any[]) => {
  return useContractRead(
    {
      addressOrName: "0xa8c66fEaAeAEE46F6595d6A45Ea87e321DbF25eF",
      contractInterface: ContractAbi,
    },
    field,
    {
      args,
    }
  );
};
