import Image from "next/image";
import { formatDateTime, retrieveImageUrl } from "@/app/_lib/utils";

export default function EventCard({ event }) {
  return (
    <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div className="relative h-48 w-full overflow-hidden rounded-md sm:h-24 sm:w-[220.8px]">
        <Image
          src={retrieveImageUrl("events", event.image_file)}
          alt={`${event.artist} - ${event.title}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="line-clamp-1 text-lg font-bold">{event.artist}</span>
        <span className="mb-2 line-clamp-1 text-sm text-muted-foreground">
          {event.title}
        </span>
        <div className="flex items-start gap-2 text-xs font-semibold text-foreground">
          <span className="rounded-full bg-muted px-2.5 py-0.5">
            {event.num_shows > 1
              ? `${formatDateTime(event.opening_date)} +${event.num_shows - 1} more`
              : formatDateTime(event.opening_date)}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5">
            {event.venue}
          </span>
        </div>
      </div>
    </div>
  );
}
