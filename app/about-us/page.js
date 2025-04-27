import Navigation from "../_components/navigation/Navigation";
import Footer from "../_components/footer/Footer";
import Link from "next/link";
import Facebook from "../_components/icons/Facebook";
import WhatsApp from "../_components/icons/WhatsApp";
import Instagram from "../_components/icons/Instagram";
import XiaoHongShu from "../_components/icons/XiaoHongShu";
import { ShoppingBag, ExternalLink } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold">About Us</h1>

        <section className="mb-8">
          <h2 className="mb-2 text-lg font-bold">Introduction</h2>
          <p>
            Welcome to JTicketing.com, your go-to platform for securing the
            hottest concert tickets with ease and confidence. We are passionate
            about bringing music lovers closer to their favorite artists,
            ensuring that you never miss out on the live experiences that matter
            most.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-lg font-bold">Who We Are</h2>
          <p>
            JTicketing.com is part of JFai Kicks, a company founded in 2021.
            Initially focused on selling sneakers, we have since expanded into
            ticketing, offering fans in Malaysia and Singapore a simple and
            reliable platform to access tickets for their favorite events. Our
            mission is straightforward yet powerful: to make ticket purchasing
            seamless, secure, and accessible for everyone. Whether you are
            looking for general admission or front-row seats, we have got you
            covered.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-lg font-bold">Why Choose Us</h2>
          <ul className="space-y-2">
            <li>
              <strong>Trusted & Reliable</strong> – We prioritise customer trust
              by providing verified and authentic tickets.
            </li>
            <li>
              <strong>Exclusive Access</strong> – Gain access to early-bird
              sales and presales.
            </li>
            <li>
              <strong>Secure Payments</strong> – Pay with confidence through our
              secure and diverse payment options.
            </li>
            <li>
              <strong>Customer Support</strong> – Our team is always ready to
              assist you with any inquiries or concerns.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-lg font-bold">Our Commitment</h2>
          <p>
            At JTicketing.com, we understand that concerts are more than just
            events—they are unforgettable moments. That is why we are dedicated
            to providing a smooth, transparent, and hassle-free ticketing
            experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-lg font-bold">Follow Us</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://www.facebook.com/jfaikicks"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <Facebook height={16} width={16} className="fill-foreground" />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  Facebook Page
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/groups/jfaikicks"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <Facebook height={16} width={16} className="fill-foreground" />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  Facebook Group
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://wa.me/601165324028"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <WhatsApp height={16} width={16} className="fill-foreground" />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  WhatsApp Contact
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://chat.whatsapp.com/HQ2VV6WdMLX67k163goGZR"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <WhatsApp height={16} width={16} className="fill-foreground" />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  WhatsApp Group
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/jfaikicks/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <Instagram height={16} width={16} className="fill-foreground" />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  Instagram
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.carousell.com.my/u/jfaikicks/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <ShoppingBag width={16} height={16} />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  Carousell
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.xiaohongshu.com/user/profile/60d82dbb0000000001006b13"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <XiaoHongShu
                  height={16}
                  width={16}
                  className="fill-foreground"
                />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  Red Note
                </span>
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">Legit References</h2>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://www.facebook.com/jfaikicks"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <ExternalLink height={16} width={16} />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  JFai Kicks Facebook Page Reviews
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.carousell.com.my/u/jfaikicks/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <ExternalLink height={16} width={16} />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  JFai Kicks Carousell Reviews
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://shorturl.at/uBJNV"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <ExternalLink height={16} width={16} />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  JFai&apos;s (MY Admin) Legit Check Post
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://shorturl.at/twDEO"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <ExternalLink height={16} width={16} />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  Yiling&apos;s (MY Admin) Legit Check Post
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="https://www.carousell.sg/u/zerodan87/reviews/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <ExternalLink height={16} width={16} />
                <span className="group-hover:text-primary group-hover:transition-colors">
                  Daniel&apos;s (SG Admin) Carousell Reviews
                </span>
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
