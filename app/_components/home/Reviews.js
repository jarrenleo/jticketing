"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/app/_components/ui/Carousel";
import Facebook from "../icons/Facebook";
import { Quote } from "lucide-react";

export default function Reviews({ reviews }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, filter: "blur-sm" },
        visible: { opacity: 1 },
      }}
    >
      <h3 className="mb-4 text-xl font-bold">Our Tickets, Your Memories</h3>

      <Carousel
        opts={{
          dragFree: true,
        }}
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem
              key={review.link}
              className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Link
                href={review.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-col justify-center rounded-md bg-muted p-6 transition-colors hover:bg-accent hover:text-accent-foreground">
                  <Quote
                    width={24}
                    height={24}
                    style={{ transform: "scaleX(-1)" }}
                  />
                  <div className="flex h-48 items-center">
                    <p>{review.quote}</p>
                  </div>
                  <div className="mb-2 flex justify-end">
                    <Quote width={24} height={24} />
                  </div>

                  <div className="mb-4 text-sm font-bold">{review.name}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Facebook
                      width={16}
                      height={16}
                      className="fill-muted-foreground"
                    />
                    <span className="text-muted-foreground">
                      Facebook Reviews
                    </span>
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
