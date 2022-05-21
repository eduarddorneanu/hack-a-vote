import { useContractWrite } from "wagmi";
import CustomContractJson from "../abis/contract-abi.json";

export const useVTSWrite = (field: string) => {
  return useContractWrite(
    {
      addressOrName: "0xa8c66fEaAeAEE46F6595d6A45Ea87e321DbF25eF",
      contractInterface: CustomContractJson,
    },
    field,
    {
      onError: (error) => {
        console.log("error:", error);
      },
    }
  );
};
