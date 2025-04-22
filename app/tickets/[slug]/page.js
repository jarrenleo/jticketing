import Tickets from "@/app/_components/tickets/Tickets";
import Footer from "@/app/_components/footer/Footer";
import Navigation from "@/app/_components/navigation/Navigation";
import { getEvent, getEventTickets } from "@/app/_lib/dataService";

export const metadata = {
  title: "JTicketing | Tickets",
  description:
    "Jticketing is a platform for securing the hottest concert tickets with ease and confidence. ",
  image: "./icon.png",
};

export default async function TicketPage({ params }) {
  const { slug } = await params;

  const [eventData, ticketsData] = await Promise.all([
    getEvent(slug),
    getEventTickets(slug),
  ]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Tickets ticketsData={ticketsData} eventData={eventData} />
      </main>
      <Footer />
    </div>
  );
}
