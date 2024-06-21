import HeroCard from "@/components/hero-cards";
import { TIP_JAR_CONTRACT_ADDRESS } from "@/constants/addresses";
import { getContract } from "thirdweb";
import { avalancheFuji } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import { client } from "../client";

const TipJar = async () => {
  const contract = getContract({
    client,
    chain: avalancheFuji,
    address: TIP_JAR_CONTRACT_ADDRESS,
  });
  const metadata = await getContractMetadata({ contract: contract });

  return (
    <div className="py-10 px-20">
      <HeroCard
        isLoading={false}
        title={metadata.name}
        description={metadata?.description}
        image={metadata?.image}
      />
    </div>
  );
};

export default TipJar;
