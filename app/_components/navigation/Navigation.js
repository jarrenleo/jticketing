import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";
import { getEvents } from "@/app/_lib/dataService";

export default async function Navigation() {
  const { data: events, error } = await getEvents();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Logo />
      <div className="flex items-center gap-0.5">
        <ThemeToggle />
        <SearchButton events={events} error={error} />
        <CartButton />
      </div>
    </nav>
  );
}
