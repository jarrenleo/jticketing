"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/app/_components/ui/Carousel";
import ReviewCard from "./ReviewCard";

export default function Reviews({ reviews }) {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold">Reviews</h3>

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
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden border-none bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-accent sm:flex sm:items-center" />
        <CarouselNext className="hidden border-none bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-accent sm:flex sm:items-center" />
      </Carousel>
    </>
  );
}
