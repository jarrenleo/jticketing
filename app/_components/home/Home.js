import FeaturedEvents from "./FeaturedEvents";
import Events from "./Events";
import Reviews from "./Reviews";
import { getEvents, getReviews } from "@/app/_lib/dataService";

export default async function Main() {
  try {
    const [
      { data: eventsData, error: eventsError },
      { data: reviewsData, error: reviewsError },
    ] = await Promise.all([getEvents(), getReviews()]);

    if (eventsError || reviewsError)
      return (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <span className="mb-2 text-2xl font-bold text-foreground">
            Server Error
          </span>
          <span className="mb-4 text-center text-muted-foreground">
            {eventsError || reviewsError}. Please refresh the page or try again
            later.
          </span>
        </div>
      );

    if (!eventsData.length)
      return (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <span className="mb-2 text-2xl font-bold text-foreground">
            We are sold out
          </span>

          <span className="mb-4 text-muted-foreground">
            Please follow our social media for updates.
          </span>
        </div>
      );

    return (
      <div className="px-4 py-8">
        <FeaturedEvents events={eventsData} />
        <Events events={eventsData} />
        <Reviews reviews={reviewsData} />
      </div>
    );
  } catch (error) {}
}
