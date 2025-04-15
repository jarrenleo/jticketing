import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/Accordion";
import Navigation from "../_components/navigation/Navigation";
import Footer from "../_components/footer/Footer";
import Link from "next/link";
import Facebook from "../_components/icons/Facebook";
import WhatsApp from "../_components/icons/WhatsApp";
import Instagram from "../_components/icons/Instagram";
import XiaoHongShu from "../_components/icons/XiaoHongShu";
import { ShoppingBag, ExternalLink } from "lucide-react";

const faqItems = [
  {
    question: "How do I purchase tickets on JTicketing.com?",
    answer:
      "Purchasing tickets is simple! Browse our listings, select your preferred event, choose your seats, and complete the checkout process using our secure payment options.",
  },
  {
    question: "Are the tickets on JTicketing.com authentic?",
    answer:
      "Yes! We ensure that all tickets sold on our platform and bought first-hand from us are 100% verified and legitimate, so you can book with confidence.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including VISA, Mastercard, Wise, Revolut, Alipay, and e-wallets for your convenience.",
  },
  {
    question: "Can I cancel or get a refund for my ticket?",
    answer:
      "All ticket sales are final. We do not offer cancellations or refunds unless the event is canceled or rescheduled. In such cases, we will provide further instructions.",
  },
  {
    question: "What happens if an event is postponed or canceled?",
    answer:
      "If an event is postponed, your ticket will remain valid for the new date. If canceled, we will inform you about refund options.",
  },
  {
    question: "How do I track my ticket order?",
    answer:
      "E-tickets and PAH (Print-at-Home) tickets will be sent to you within 24 hours via email or WhatsApp, provided that the organiser has already released the e-tickets.",
  },
  {
    question: "What are the delivery methods for the tickets?",
    answer: "We only provide e-tickets and PAH (Print-at-Home) tickets.",
  },
  {
    question: "Is my ticket finalised?",
    answer:
      "If the e-ticket is available on the same day as the sales, then yes, it is finalised. If it is released only weeks before the event, there is a small chance your seat may change. If so, our customer service will contact you.",
  },
  {
    question: "Do you offer VIP or presale tickets?",
    answer:
      "Yes! We provide exclusive access to presales and early-bird sales for selected events.",
  },
  {
    question: "How do I contact customer support?",
    answer: (
      <>
        <p>
          You can reach our customer support team via WhatsApp for a faster
          response or by email. We are here to assist you with any concerns.
        </p>
        <br />
        <Link
          href="https://wa.me/601165324028"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground transition-colors hover:text-primary"
        >
          WhatsApp Us
        </Link>
        <span> | </span>
        <Link
          href="mailto:jfaikicks@gmail.com"
          className="text-foreground transition-colors hover:text-primary"
        >
          Email Us
        </Link>
      </>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="container mx-auto flex-grow px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">About Us</h1>

        <section className="mb-8">
          <p>
            Welcome to JTicketing.com, your go-to platform for securing the
            hottest concert tickets with ease and confidence. We are passionate
            about bringing music lovers closer to their favorite artists,
            ensuring that you never miss out on the live experiences that matter
            most.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Who We Are</h2>
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
          <h2 className="mb-4 text-xl font-bold">Why Choose Us</h2>
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
          <h2 className="mb-4 text-xl font-bold">Our Commitment</h2>
          <p>
            At JTicketing.com, we understand that concerts are more than just
            events—they are unforgettable moments. That is why we are dedicated
            to providing a smooth, transparent, and hassle-free ticketing
            experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Follow Us</h2>
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
                  WhatsApp Number
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
                  Xiao Hong Shu
                </span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Legit References</h2>
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

        <section id="faq">
          <h2 className="mb-4 text-3xl font-bold">
            Frequently Asked Questions (FAQ)
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="transition-colors hover:text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
      <Footer />
    </div>
  );
}
