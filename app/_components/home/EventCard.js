import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { formatDateTime, retrieveImageUrl } from "../../_lib/utils";

export default function EventCard({ event }) {
  return (
    <Link href={`/tickets/${event.slug}`} className="group block">
      <div className="group transition-all">
        <div className="relative h-48 overflow-hidden rounded-md">
          <Image
            src={retrieveImageUrl("events", event.image_file)}
            alt={`${event.artist} - ${event.title}`}
            fill
            className="object-cover transition-transform group-hover:scale-105 group-hover:duration-1000 group-hover:ease-out"
          />
        </div>
        <div className="py-4">
          <div className="mb-4">
            <h3 className="line-clamp-1 text-lg font-bold">{event.artist}</h3>
            <p className="line-clamp-1 text-sm text-muted-foreground">
              {event.title}
            </p>
          </div>

          <div className="mb-2 flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2" width={16} height={16} />
            <span className="line-clamp-1">
              {event.num_shows > 1
                ? `${formatDateTime(event.opening_datetime)} + ${event.num_shows - 1} more`
                : formatDateTime(event.opening_datetime)}
            </span>
          </div>

          <div className="mb-4 flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2" width={16} height={16} />
            <span className="line-clamp-1">{event.venue}</span>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-bold">
              {event.starting_price ? `RM ${event.starting_price}` : "-"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
