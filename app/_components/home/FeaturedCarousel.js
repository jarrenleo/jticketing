"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { retrieveImageUrl } from "@/app/_lib/utils";

export default function FeaturedCarousel({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = 5000;
  let items = events;
  const featuredEvents = events.filter((event) => event.is_featured);
  if (featuredEvents.length) items = featuredEvents;
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };
  const previousSlide = () => {
    setCurrentIndex(
      (previousIndex) => (previousIndex - 1 + items.length) % items.length,
    );
  };
  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, filter: "blur-sm" },
        visible: { opacity: 1, filter: "blur-none" },
      }}
    >
      <section className="relative mb-8 h-48 overflow-hidden sm:h-96">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute h-full w-full max-w-[883.2px]">
            {items.map((item, index) => {
              const position =
                (index - currentIndex + items.length) % items.length;
              const normalisedPosition =
                position > 2 ? position - items.length : position;
              return (
                <motion.div
                  key={item.slug}
                  className="absolute h-full w-full"
                  initial={false}
                  animate={{
                    x: `${normalisedPosition * 100}%`,
                    scale: index === currentIndex ? 1 : 0.85,
                    opacity: index === currentIndex ? 1 : 0.6,
                    zIndex: items.length - Math.abs(normalisedPosition),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                >
                  <Link
                    href={`/tickets/${item.slug}`}
                    className="cursor-pointer"
                  >
                    <Image
                      src={retrieveImageUrl("events", item.image_file)}
                      alt={`${item.artist} event`}
                      fill
                      className="rounded-md object-cover"
                      priority={index === currentIndex}
                    />
                    <div className="absolute bottom-0 left-0 right-0 rounded-md rounded-t-none bg-gradient-to-t from-black/80 to-transparent p-8 pt-[112px]">
                      <h3 className="line-clamp-1 text-lg font-bold text-white">
                        {item.artist}
                      </h3>
                      <p className="line-clamp-1 text-sm text-[hsl(0,0%,63.92%)]">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => {
            previousSlide();
            setIsAutoPlaying(false);
          }}
          className="absolute left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          aria-label="Previous slide"
        >
          <ChevronLeft width={16} height={16} />
        </button>
        <button
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
          }}
          className="absolute right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          aria-label="Next slide"
        >
          <ChevronRight width={16} height={16} />
        </button>
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
