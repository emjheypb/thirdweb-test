"use client";
import Logo from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { menuItems } from "@/constants/menu";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/app/client";

const StickyNavbar = () => {
  const pathname = usePathname();
  const [isSticky, setSticky] = useState(false);
  // const [y, setY] = useState(0);

  const handleStickyNavbar = () => {
    // setY(window.scrollY);
    if (window.scrollY >= 150) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <nav className={`z-10`}>
      {/* {y} */}
      <div
        className={`hidden md:flex px-5 transition duration-500 ${
          isSticky ? "shadow-xl bg-white/50" : "shadow-none bg-gradient-to-b"
        } to-transparent from-white/75 fixed min-w-full gap-2 items-center justify-between`}
      >
        <div className="flex items-center">
          <Logo />
          {menuItems.map((item) => (
            <Link
              href={item.local}
              key={item.id}
              className={`p-4 hover:font-bold ${
                pathname === item.local && "font-extrabold"
              }`}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Example App",
            url: "https://example.com",
          }}
        />
      </div>
    </nav>
  );
};

export default StickyNavbar;
