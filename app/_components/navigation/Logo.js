import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.png" alt="JTicketing Logo" width={24} height={24} />
      <span className="font-bold">JTicketing</span>
    </Link>
  );
}
