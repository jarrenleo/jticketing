import Image from "next/image";
import Link from "next/link";
import SearchButton from "./SearchButton";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import { getEvents } from "@/app/_lib/dataService";

export default async function Navigation() {
  const events = await getEvents();

  return (
    <nav className="container sticky top-0 z-10 mx-auto flex items-center justify-between bg-background/60 px-4 py-3 backdrop-blur">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="JTicketing Logo"
          width={32}
          height={32}
          className="cursor-pointer"
        />
        <span className="font-medium">JTicketing</span>
      </Link>

      <div className="flex items-center gap-0.5">
        <ThemeToggle />
        <SearchButton events={events} />
        <CartButton />
      </div>
    </nav>
  );
}
