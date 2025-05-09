import Link from "next/link";
import FeaturedEvents from "./FeaturedEvents";
import Events from "./Events";
import Reviews from "./Reviews";
import { getEvents, getReviews } from "@/app/_lib/dataService";
import Facebook from "../icons/Facebook";
import Instagram from "../icons/Instagram";
import XiaoHongShu from "../icons/XiaoHongShu";

export const fetchCache = "force-no-store";

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
            We are sold out.
          </span>

          <span className="mb-4 text-muted-foreground">
            Please follow our social media for updates.
          </span>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.facebook.com/jfaikicks"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                height={24}
                width={24}
                className="fill-foreground transition-colors hover:fill-[#0866FF]"
              />
            </Link>
            <Link
              href="https://www.instagram.com/jfaikicks"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                height={24}
                width={24}
                className="fill-foreground transition-colors hover:fill-[#FF0069]"
              />
            </Link>
            <Link
              href="https://www.xiaohongshu.com/user/profile/60d82dbb0000000001006b13"
              target="_blank"
              rel="noopener noreferrer"
            >
              <XiaoHongShu
                height={24}
                width={24}
                className="fill-foreground transition-colors hover:fill-[#FF2442]"
              />
            </Link>
          </div>
        </div>
      );

    const sortedEvents = eventsData.sort(
      (a, b) => new Date(a.opening_date) - new Date(b.opening_date),
    );

    return (
      <div className="px-4 py-8">
        <FeaturedEvents events={sortedEvents} />
        <Events events={sortedEvents} />
        <Reviews reviews={reviewsData} />
      </div>
    );
  } catch (error) {}
}
