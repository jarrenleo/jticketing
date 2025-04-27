import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/Popover";
import Facebook from "../icons/Facebook";
import WhatsApp from "../icons/WhatsApp";
import Instagram from "../icons/Instagram";
import XiaoHongShu from "../icons/XiaoHongShu";
import { Mail } from "lucide-react";
import { Button } from "../ui/Button";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-between px-4 py-8 md:flex-row">
      <div className="mb-8 md:mb-0">
        <div className="span mb-2 flex items-end justify-between md:mb-4 md:justify-normal md:gap-2">
          <div className="flex items-center gap-2 rounded-full">
            <Image
              src="/logo.png"
              alt="JTicketing Logo"
              width={24}
              height={24}
            />
            <span className="font-bold">JTicketing</span>
          </div>
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JTicketing
          </span>
        </div>

        <span className="text-sm text-muted-foreground">
          Secure the hottest tickets with ease and confidence.
        </span>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-4 md:justify-end">
          <Link
            href="https://www.facebook.com/jfaikicks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook
              height={24}
              width={24}
              className="fill-foreground transition-colors hover:fill-[#0866FF]"
            />
          </Link>
          <Link
            href="https://www.instagram.com/jfaikicks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram
              height={24}
              width={24}
              className="fill-foreground transition-colors hover:fill-[#FF0069]"
            />
          </Link>
          <Link
            href="https://www.xiaohongshu.com/user/profile/60d82dbb0000000001006b13"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XiaoHongShu
              height={24}
              width={24}
              className="fill-foreground transition-colors hover:fill-[#FF2442]"
            />
          </Link>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link
            href="/about-us"
            className="transition-colors hover:text-primary"
          >
            About Us
          </Link>
          <Popover>
            <PopoverTrigger className="transition-colors hover:text-primary">
              Contact Us
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-bold">Need help?</h3>
                  <p className="text-sm text-muted-foreground">
                    We are here to assist you with any concerns.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="https://wa.me/601165324028"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-border py-2 transition-colors hover:bg-accent"
                  >
                    <WhatsApp
                      height={16}
                      width={16}
                      className="fill-foreground"
                    />
                    <span className="text-sm text-foreground">WhatsApp</span>
                  </Link>

                  <Link
                    href="mailto:jfaikicks@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-border py-2 transition-colors hover:bg-accent"
                  >
                    <Mail
                      height={16}
                      width={16}
                      className="stroke-foreground"
                    />
                    <span className="text-sm text-foreground">Email</span>
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Link href="/faq" className="transition-colors hover:text-primary">
            FAQ
          </Link>
          <Link href="/terms" className="transition-colors hover:text-primary">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-primary"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
