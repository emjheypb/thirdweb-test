import Link from "next/link";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { avalancheFuji } from "thirdweb/chains";
import { MediaRenderer } from "thirdweb/react";
import { getContractMetadata } from "thirdweb/extensions/common";

type CardProps = {
  href: string;
  constractAddress: string;
};

const ContractCard = async (props: CardProps) => {
  const contract = getContract({
    client,
    chain: avalancheFuji,
    address: props.constractAddress,
  });
  const metadata = await getContractMetadata({ contract: contract });

  return (
    <div className="bg-slate-900 rounded-lg transition md:w-96 sm:w-44 w-full hover:bg-slate-700">
      <Link href={props.href}>
        <MediaRenderer
          src={metadata?.image}
          client={client}
          width="100%"
          height="auto"
          className="rounded-t-lg"
        />
        <div className="p-4">
          <h1 className="font-extrabold text-lg text-blue-500">
            {metadata.name}
          </h1>
          <p>{metadata?.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default ContractCard;
