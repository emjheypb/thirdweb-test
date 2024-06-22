"use client";
import HeroCard from "@/components/hero-cards";
import { tipjarContract } from "@/constants/contracts";
import { useEffect, useState } from "react";
import { getContractMetadata } from "thirdweb/extensions/common";
import { prepareContractCall, toEther, toWei } from "thirdweb";
import {
  TransactionButton,
  useActiveAccount,
  useContractEvents,
  useReadContract,
} from "thirdweb/react";

type contractMetadata = {
  [key: string]: any;
  name: string;
  symbol: string;
};

const TipJar = () => {
  const account = useActiveAccount();
  const [metadata, setMetadata] = useState({} as contractMetadata);
  const [tipAmount, setTipAmount] = useState(0);

  const { data: tipjarBalance, refetch: refetchTipjarBalance } =
    useReadContract({ contract: tipjarContract, method: "getBalance" });

  const { data: owner } = useReadContract({
    contract: tipjarContract,
    method: "owner",
  });

  const { data: contractEvents, refetch: refetchContractEvents } =
    useContractEvents({ contract: tipjarContract });

  useEffect(() => {
    const fetchMetadata = async () => {
      console.log("fetchMetadata");
      try {
        const result = await getContractMetadata({ contract: tipjarContract });
        setMetadata(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMetadata();
  }, []);

  return (
    <div className="md:py-10 p-14 md:px-20 gap-10 flex flex-col">
      <HeroCard
        title={metadata?.name}
        description={metadata?.description}
        image={metadata?.image}
      />
      {account && (
        <div className="flex md:flex-row flex-col gap-10">
          <div className="flex-1 bg-slate-900 rounded-lg">
            <div className="p-4 flex flex-col gap-2">
              <h2 className="font-bold text-md">Tip</h2>
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(Number(e.target.value))}
                step={0.001}
                className="text-black w-full p-2 rounded-lg"
              />
            </div>
            <div className="rounded-b-lg w-full">
              <TransactionButton
                unstyled
                className="bg-blue-500 rounded-b-lg p-4 w-full text-black hover:text-white hover:bg-blue-400 flex justify-center"
                transaction={() =>
                  prepareContractCall({
                    contract: tipjarContract,
                    method: "tip",
                    params: [],
                    value: BigInt(toWei(tipAmount.toString())),
                  })
                }
                onTransactionConfirmed={() => {
                  setTipAmount(0);
                  refetchTipjarBalance();
                }}
              >
                Give Tip
              </TransactionButton>
            </div>
          </div>

          <div className="flex-1 bg-slate-900 rounded-lg">
            <div className="p-4 flex flex-col gap-2">
              <h2 className="font-bold text-md">Jar Contents</h2>
              <div className="flex w-full justify-center font-bold text-blue-500 h-full items-center">
                <h3 className="text-4xl">
                  {tipjarBalance ? toEther(BigInt(tipjarBalance)) : "Empty"}
                </h3>
              </div>
            </div>
            {account.address === owner && tipjarBalance && (
              <div className="rounded-b-lg w-full">
                <TransactionButton
                  unstyled
                  className="bg-blue-500 rounded-b-lg p-4 w-full text-black hover:text-white hover:bg-blue-400 flex justify-center"
                  transaction={() =>
                    prepareContractCall({
                      contract: tipjarContract,
                      method: "withdraw",
                      params: [],
                    })
                  }
                  onTransactionConfirmed={() => {
                    refetchTipjarBalance();
                  }}
                >
                  Empty Tip Jar
                </TransactionButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TipJar;
