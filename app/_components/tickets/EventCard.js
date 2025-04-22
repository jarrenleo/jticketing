import Image from "next/image";
import { formatDateTime, retrieveImageUrl } from "@/app/_lib/utils";

export default function EventCard({ event }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="relative h-28 w-[220.8px] overflow-hidden rounded-md md:h-24">
        <Image
          src={retrieveImageUrl("events", event.image_file)}
          alt={`${event.artist} - ${event.title}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="line-clamp-1 text-xl font-bold">{event.artist}</span>
        <span className="mb-2 line-clamp-1 text-sm text-muted-foreground">
          {event.title}
        </span>
        <div className="flex flex-col items-start gap-2 text-xs font-semibold text-foreground md:flex-row md:items-center">
          <span className="rounded-full bg-muted px-2.5 py-0.5">
            {event.num_shows > 1
              ? `${formatDateTime(event.opening_datetime)} + ${event.num_shows - 1} more`
              : formatDateTime(event.opening_datetime)}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5">
            {event.venue}
          </span>
        </div>
      </div>
    </div>
  );
}
