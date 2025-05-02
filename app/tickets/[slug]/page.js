import Navigation from "@/app/_components/navigation/Navigation";
import Tickets from "@/app/_components/tickets/Tickets";
import Footer from "@/app/_components/footer/Footer";
import { getEvent, getEventTickets } from "@/app/_lib/dataService";
import { retrieveImageUrl } from "@/app/_lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const eventData = await getEvent(slug);

  if (eventData)
    return {
      title: `JTicketing | ${eventData.artist}`,
      description: `Jticketing is a platform for securing the hottest tickets with ease and confidence. Secure tickets for ${eventData.artist} with us today.`,
      openGraph: {
        images: [retrieveImageUrl("events", eventData.image_file)],
      },
    };
}

export default async function TicketPage({ params }) {
  const { slug } = await params;
  const [
    { data: eventData, error: eventError },
    { data: ticketsData, error: ticketsError },
  ] = await Promise.all([getEvent(slug), getEventTickets(slug)]);

  if (eventError || ticketsError)
    return (
      <div className="container mx-auto flex min-h-screen flex-col">
        <Navigation />
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <span className="mb-2 text-2xl font-bold text-foreground">
            Server Error
          </span>
          <span className="mb-4 text-center text-muted-foreground">
            {eventError || ticketsError}. Please refresh the page or try again
            later.
          </span>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="container mx-auto flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Tickets eventData={eventData} ticketsData={ticketsData} />
      </main>
      <Footer />
    </div>
  );
}
