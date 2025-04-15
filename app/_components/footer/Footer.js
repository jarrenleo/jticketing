import Image from "next/image";
import Link from "next/link";
import Facebook from "../icons/Facebook";
import WhatsApp from "../icons/WhatsApp";
import Instagram from "../icons/Instagram";
import XiaoHongShu from "../icons/XiaoHongShu";

export default function Footer() {
  return (
    <footer className="container mx-auto px-4 py-8">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="mb-8 md:mb-0">
          <div className="span mb-4 flex items-end justify-between md:justify-normal md:gap-2">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="JTicketing Logo"
                width={24}
                height={24}
              />
              <span className="font-medium">JTicketing</span>
            </div>
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} JTicketing
            </span>
          </div>

          <span className="text-sm">
            Secure the hottest tickets with ease and confidence.
          </span>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-4 md:justify-end">
            <Link
              href="https://www.facebook.com/groups/jfaikicks"
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
              href="https://www.xiaohongshu.com/user/profile/1717129959771911"
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
              About Us
            </Link>
            <Link
              href="/about-us#faq"
              className="transition-colors hover:text-primary"
            >
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
