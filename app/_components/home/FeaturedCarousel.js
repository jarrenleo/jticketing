"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/Carousel";
import { retrieveImageUrl } from "@/app/_lib/utils";
import Autoplay from "embla-carousel-autoplay";

export default function FeaturedCarousel({ events }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, filter: "blur-sm" },
        visible: { opacity: 1, filter: "blur-none" },
      }}
    >
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
        className="mb-8"
      >
        <CarouselContent className="h-48 sm:h-[257.68px] md:h-[313.33px] lg:h-[424.64px] xl:h-[535.94px] 2xl:h-[653.91px]">
          {events.map((event, index) => (
            <CarouselItem key={index} className="group">
              <Link href={`/tickets/${event.slug}`}>
                <div className="relative h-full w-full">
                  <Image
                    src={retrieveImageUrl("events", event.image_file)}
                    alt={`${event.artist} event`}
                    fill
                    className="rounded-md object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end rounded-md bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-8 lg:p-12">
                    <h3 className="font-bold text-white sm:text-lg">
                      {event.artist}
                    </h3>
                    <p className="text-sm text-white sm:text-base">
                      {event.title}
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
    </motion.div>
  );
}
