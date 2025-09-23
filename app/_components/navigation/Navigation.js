import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-background/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Logo />
      <div className="flex items-center gap-0.5">
        <ThemeToggle />
        <SearchButton />
        <CartButton />
      </div>
    </nav>
  );
}
