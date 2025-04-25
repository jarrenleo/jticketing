import Tickets from "@/app/_components/tickets/Tickets";
import Footer from "@/app/_components/footer/Footer";
import Navigation from "@/app/_components/navigation/Navigation";
import { getEvent, getEventTickets } from "@/app/_lib/dataService";
import { retrieveImageUrl } from "@/app/_lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const eventData = await getEvent(slug);

  if (!eventData)
    return {
      title: "JTicketing",
      description:
        "Jticketing is a platform for securing the hottest tickets with ease and confidence.",
      image: "./icon.png",
    };

  return {
    title: `JTicketing | ${eventData.artist},`,
    description: `Jticketing is a platform for securing the hottest tickets with ease and confidence. Secure tickets for ${eventData.artist} with us today.`,
    openGraph: {
      images: [retrieveImageUrl("events", eventData.image_file)],
    },
  };
}

export default async function TicketPage({ params }) {
  const { slug } = await params;
  const [eventData, ticketsData] = await Promise.all([
    getEvent(slug),
    getEventTickets(slug),
  ]);

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Tickets ticketsData={ticketsData} eventData={eventData} />
      </main>
      <Footer />
    </div>
  );
}
