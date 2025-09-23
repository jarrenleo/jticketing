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
import BlurEffect from "react-progressive-blur";

export default function FeaturedEvents({ events }) {
  let items = events;
  const featuredEvents = events.filter((event) => event.is_featured);
  if (featuredEvents.length) items = featuredEvents;

  return (
    <div className="mb-12">
      <h3 className="mb-4 text-xl font-bold">Featured</h3>
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
            <CarouselItem key={item.slug}>
              <Link href={`/tickets/${item.slug}`} className="group">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src={retrieveImageUrl("events", item.image_file)}
                    alt={`${item.artist} - ${item.title} event poster`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:duration-300 group-hover:ease-out"
                  />
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                    <h3 className="mb-0.5 text-lg font-bold text-white sm:text-xl md:mb-1 md:text-2xl lg:mb-1.5 lg:text-3xl">
                      {item.artist}
                    </h3>
                    <p className="line-clamp-1 text-sm text-white sm:text-base md:text-lg">
                      {item.title}
                    </p>
                  </div>
                  <BlurEffect
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 rounded-xl sm:h-28 md:h-32 lg:h-36"
                    intensity={500}
                    position="bottom"
                  />
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
