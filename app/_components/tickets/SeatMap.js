"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { retrieveImageUrl } from "@/app/_lib/utils";

export default function SeatMap({ event }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  function zoomIn() {
    setScale((prev) => Math.min(prev + 0.25, 3));
  }

  function zoomOut() {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  }

  function resetZoom() {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }

  function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }

  function handleMouseMove(e) {
    if (!isDragging) return;

    e.preventDefault();
    e.stopPropagation();

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setPosition({ x: newX, y: newY });
  }

  function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }

  function handleMouseLeave(e) {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }

  function handleWheel(e) {
    e.preventDefault();

    // Determine zoom direction based on wheel delta
    const zoomFactor = 0.1;
    e.deltaY < 0
      ? // Scroll up - zoom in
        setScale((prev) => Math.min(prev + zoomFactor, 3))
      : // Scroll down - zoom out
        setScale((prev) => Math.max(prev - zoomFactor, 0.5));
  }

  if (!event) return null;

  return (
    <section className="col-span-2 mb-8 rounded-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Seat Map</h2>
        <div className="flex items-center space-x-0.5">
          <button
            onClick={zoomIn}
            className="cursor-pointer rounded-md p-1.5 transition-colors hover:bg-accent"
            aria-label="Zoom in button"
          >
            <ZoomIn width={20} height={20} />
          </button>
          <button
            onClick={zoomOut}
            className="cursor-pointer rounded-md p-1.5 transition-colors hover:bg-accent"
            aria-label="Zoom out button"
          >
            <ZoomOut width={20} height={20} />
          </button>
          <button
            onClick={resetZoom}
            className="cursor-pointer rounded-md p-1.5 transition-colors hover:bg-accent"
            aria-label="Reset zoom button"
          >
            <RotateCcw width={20} height={20} />
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative h-[500px] w-full cursor-grab overflow-hidden active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      >
        <div
          className="absolute transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={retrieveImageUrl("seatmaps", event.seatmap_file)}
            alt={`${event.title} Seat Map`}
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
