import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../_components/ui/Accordion";
import Navigation from "../_components/navigation/Navigation";
import Footer from "../_components/footer/Footer";

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

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="container mx-auto flex-1 px-4 py-8">
        <h2 className="mb-4 text-3xl font-bold">
          Frequently Asked Questions (FAQ)
        </h2>
        <Accordion type="single" collapsible>
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
      </main>
      <Footer />
    </div>
  );
}
