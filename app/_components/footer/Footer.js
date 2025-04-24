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

export default function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8">
      <div className="container mx-auto flex flex-col justify-between md:flex-row">
        <div className="mb-8 md:mb-0">
          <div className="span mb-4 flex items-end justify-between md:justify-normal md:gap-2">
            <div className="flex items-center gap-2">
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
                height={20}
                width={20}
                className="fill-foreground transition-colors hover:fill-[#0866FF]"
              />
            </Link>
            <Link
              href="https://chat.whatsapp.com/HQ2VV6WdMLX67k163goGZR"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp
                height={20}
                width={20}
                className="fill-foreground transition-colors hover:fill-[#25D366]"
              />
            </Link>
            <Link
              href="https://www.instagram.com/jfaikicks"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                height={20}
                width={20}
                className="fill-foreground transition-colors hover:fill-[#FF0069]"
              />
            </Link>
            <Link
              href="https://www.xiaohongshu.com/user/profile/60d82dbb0000000001006b13"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XiaoHongShu
                height={20}
                width={20}
                className="fill-foreground transition-colors hover:fill-[#FF2442]"
              />
            </Link>
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link
              href="/about-us"
              className="transition-colors hover:text-primary"
            >
              About us
            </Link>
            <Popover>
              <PopoverTrigger className="transition-colors hover:text-primary">
                Contact us
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold">Need help?</h3>
                    <p className="text-sm text-muted-foreground">
                      You may contact us via WhatsApp or email.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Link
                      href="https://wa.me/601165324028"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2"
                    >
                      <WhatsApp
                        height={16}
                        width={16}
                        className="fill-foreground transition-colors group-hover:fill-[#25D366]"
                      />
                      <span className="transition-colors group-hover:text-[#25D366]">
                        +601165324028
                      </span>
                    </Link>
                    <Link
                      href="mailto:jfaikicks@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2"
                    >
                      <Mail
                        height={16}
                        width={16}
                        className="transition-colors group-hover:stroke-primary"
                      />
                      <span className="transition-colors group-hover:text-primary">
                        jfaikicks@gmail.com
                      </span>
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Link href="/faq" className="transition-colors hover:text-primary">
              FAQ
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-primary"
            >
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
      </div>
    </footer>
  );
}
