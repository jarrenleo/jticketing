"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";

export default function Logo() {
  const pathname = usePathname();

  if (pathname === "/")
    return (
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="JTicketing Logo"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <span className="font-bold">JTicketing</span>
      </Link>
    );

  return (
    <Link href="/" className="group flex items-center gap-1">
      <ChevronLeft
        width={24}
        height={24}
        className="stroke-muted-foreground stroke-1 transition-colors group-hover:stroke-primary"
      />
      <span className="text-muted-foreground transition-colors group-hover:text-primary">
        Back to Home
      </span>
    </Link>
  );
}
