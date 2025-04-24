import Logo from "./Logo";
import SearchButton from "./SearchButton";
import ThemeToggle from "./ThemeToggle";
import CartButton from "./CartButton";
import { getEvents } from "@/app/_lib/dataService";

export default async function Navigation() {
  const events = await getEvents();

  return (
    <nav className="sticky top-0 z-20 border-b border-border">
      <div className="container mx-auto flex items-center justify-between bg-background/80 px-4 py-3 backdrop-blur-sm">
        <Logo />
        <div className="flex items-center gap-0.5">
          <ThemeToggle />
          <SearchButton events={events} />
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
