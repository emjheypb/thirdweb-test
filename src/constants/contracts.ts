import { getContract } from "thirdweb";
import { client } from "../app/client";
import { TIP_JAR_CONTRACT_ADDRESS } from "@/constants/addresses";
import { avalancheFuji } from "thirdweb/chains";
import { tipjarABI } from "./abis";

export const tipjarContract = getContract({
  client,
  chain: avalancheFuji,
  address: TIP_JAR_CONTRACT_ADDRESS,
  abi: tipjarABI,
});
