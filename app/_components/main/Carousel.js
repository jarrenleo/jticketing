"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ events }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredEvents = events.filter((event) => event.is_featured);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredEvents.length]);

  function goToSlide(index) {
    setCurrentSlide(index);
  }

  function nextSlide() {
    setCurrentSlide((previous) => (previous + 1) % featuredEvents.length);
  }

  function previousSlide() {
    setCurrentSlide(
      (previous) =>
        (previous - 1 + featuredEvents.length) % featuredEvents.length,
    );
  }

  const variants = {
    hidden: { opacity: 0, filter: "blur(8px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  };

  return (
    <section className="mb-8">
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <div className="group relative mb-6 h-96 overflow-hidden rounded-md md:h-[32rem]">
          {featuredEvents.map((event, index) => (
            <Link
              key={event.slug}
              href={`/tickets/${event.slug}`}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={event.image_url}
                alt={event.artist}
                fill
                className="object-cover transition-transform group-hover:scale-105 group-hover:duration-1000 group-hover:ease-out"
              />
              <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/70 to-transparent p-12">
                <h2 className="text-xl font-bold text-white">{event.artist}</h2>
                <p className="line-clamp-1 text-xl text-white">{event.title}</p>
              </div>
            </Link>
          ))}

          <button
            onClick={previousSlide}
            className="absolute left-4 top-1/2 -translate-x-full -translate-y-1/2 transform rounded-full bg-black/30 p-2 text-white opacity-0 transition-all duration-300 hover:bg-black/50 group-hover:translate-x-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft width={20} height={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full transform rounded-full bg-black/30 p-2 text-white opacity-0 transition-all duration-300 hover:bg-black/50 group-hover:translate-x-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight width={20} height={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {featuredEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
