import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";

export default function Home() {
  return (
    <main className="p-4 min-h-[100vh] flex container max-w-screen mx-auto">
      <div className="py-10">
        <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
          My{" "}
          <span className="inline-block -skew-x-6 text-blue-500">
            Contracts
          </span>
        </h1>
        <div className="flex justify-center mb-20"></div>
      </div>
    </main>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
