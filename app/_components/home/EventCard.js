"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { formatDateTime, retrieveImageUrl } from "../../_lib/utils";

export default function EventCard({ event }) {
  return (
    <Link href={`/tickets/${event.slug}`} className="group">
      <div className="relative h-[174.78px] w-full overflow-hidden rounded-xl sm:h-[125.36px] md:h-[153.19px] lg:h-[136.91px] xl:h-[128.77px] 2xl:h-[156.6px]">
        <Image
          src={retrieveImageUrl("events", event.image_file)}
          alt={`${event.artist} - ${event.title} event poster`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:duration-300 group-hover:ease-out"
        />
      </div>
      <div className="pt-4">
        <div className="mb-4">
          <h3 className="line-clamp-1 font-bold">{event.artist}</h3>
          <p className="line-clamp-1 text-sm text-muted-foreground">
            {event.title}
          </p>
        </div>

        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar width={16} height={16} />
          <span className="line-clamp-1">
            {event.num_shows > 1
              ? `${formatDateTime(event.opening_date)} +${event.num_shows - 1} more`
              : formatDateTime(event.opening_date)}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin width={16} height={16} />
          <span className="line-clamp-1">{event.venue}</span>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="font-bold">
            {event.starting_price > 0 ? `RM ${event.starting_price}` : 0}
          </p>
        </div>
      </div>
    </Link>
  );
}
