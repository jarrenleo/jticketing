"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/Carousel";
import { retrieveImageUrl } from "@/app/_lib/utils";
import Autoplay from "embla-carousel-autoplay";

export default function FeaturedEvents({ events }) {
  let items = events;
  const featuredEvents = events.filter((event) => event.is_featured);
  if (featuredEvents.length) items = featuredEvents;

  return (
    <div className="mb-8">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnMouseEnter: true,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="h-[174.78px] sm:h-[257.68px] md:h-[313.33px] lg:h-[424.64px] xl:h-[535.94px] 2xl:h-[653.91px]">
          {items.map((item) => (
            <CarouselItem key={item.slug} className="group">
              <Link href={`/tickets/${item.slug}`}>
                <div className="relative h-full w-full">
                  <Image
                    src={retrieveImageUrl("events", item.image_file)}
                    alt={`${item.artist} - ${item.title} event poster`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-md object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end rounded-md bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-8 lg:p-12">
                    <h3 className="font-bold text-white sm:text-lg">
                      {item.artist}
                    </h3>
                    <p className="text-sm text-white sm:text-base">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden border-none bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-accent sm:flex sm:items-center" />
        <CarouselNext className="hidden border-none bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-accent sm:flex sm:items-center" />
      </Carousel>
    </div>
  );
}
