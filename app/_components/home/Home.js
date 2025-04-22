import Carousel from "./Carousel";
import Events from "./Events";
import { getEvents } from "@/app/_lib/dataService";

export default async function Main() {
  const events = await getEvents();
  const ticketsAvailableEvents = events.filter(
    (event) => event.tickets_available,
  );

  if (!ticketsAvailableEvents.length)
    return (
      <main className="container mx-auto flex flex-grow flex-col items-center justify-center gap-0.5 px-4 py-8 text-muted-foreground">
        <span>
          There are currently no events with tickets available for purchase.
        </span>
        <span>Please check back again later.</span>
      </main>
    );

  const sortedEvents = ticketsAvailableEvents.sort(
    (a, b) => new Date(a.openingDatetime) - new Date(b.openingDatetime),
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <Carousel events={sortedEvents} />
      <Events events={sortedEvents} />
    </main>
  );
}
