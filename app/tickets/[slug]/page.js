import Navigation from "@/app/_components/navigation/Navigation";
import Tickets from "@/app/_components/tickets/Tickets";
import Footer from "@/app/_components/footer/Footer";
import { getEvent, getEventTickets } from "@/app/_lib/dataService";

export default async function Home({ params }) {
  const { slug } = await params;

  const [eventData, ticketsData] = await Promise.all([
    getEvent(slug),
    getEventTickets(slug),
  ]);

  return (
    <>
      <Navigation />
      <Tickets ticketsData={ticketsData} eventData={eventData} />
      <Footer />
    </>
  );
}
