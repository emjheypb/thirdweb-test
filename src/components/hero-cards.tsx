import { client } from "@/app/client";
import { MediaRenderer } from "thirdweb/react";

type HeroCardProps = {
  isLoading: boolean;
  title: string;
  description: string;
  image: string;
};

const HeroCard = (props: HeroCardProps) => {
  return (
    <div className="bg-slate-900 rounded-lg transition max-w-full md:h-96 flex flex-col md:flex-row items-center">
      <MediaRenderer
        src={props.image}
        client={client}
        width="auto"
        height="100%"
        alt={props.title}
        className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg"
      />
      <div className="p-4 md:px-4 flex gap-5 flex-col">
        <h1 className="text-5xl font-bold text-blue-500">{props.title}</h1>
        <p className="text-xl">{props.description}</p>
      </div>
    </div>
  );
};

export default HeroCard;
