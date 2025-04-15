import Carousel from "./Carousel";
import Events from "./Events";
import { getEvents } from "@/app/_lib/dataService";

export default async function MainContent() {
  const events = await getEvents();
  const sortedEvents = events.sort(
    (a, b) => new Date(a.openingDatetime) - new Date(b.openingDatetime),
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <Carousel events={sortedEvents} />
      <Events events={sortedEvents} />
    </main>
  );
}
