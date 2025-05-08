"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { retrieveImageUrl } from "@/app/_lib/utils";

function getDistance(touch1, touch2) {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

export default function SeatMap({ event }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPinching, setIsPinching] = useState(false);
  const [pinchStartScale, setPinchStartScale] = useState(1);
  const [touchStartDistance, setTouchStartDistance] = useState(0);
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
    if (e.target === containerRef.current || e.target.tagName === "IMG") {
      e.preventDefault();
      e.stopPropagation();

      if (isPinching) return;

      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
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
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }
  }

  function handleMouseLeave(e) {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }
  }

  function handleWheel(e) {
    e.preventDefault();

    const zoomFactor = 0.1;
    const newScale = e.deltaY < 0 ? scale + zoomFactor : scale - zoomFactor;
    const clampedScale = Math.max(0.5, Math.min(newScale, 3));
    setScale(clampedScale);
  }

  function handleTouchStart(e) {
    e.preventDefault();
    e.stopPropagation();

    const touches = e.touches;

    if (touches.length === 2) {
      const dist = getDistance(touches[0], touches[1]);
      setIsPinching(true);
      setIsDragging(false);
      setPinchStartScale(scale);
      setTouchStartDistance(dist);
    } else if (touches.length === 1 && !isPinching) {
      setIsDragging(true);
      setDragStart({
        x: touches[0].clientX - position.x,
        y: touches[0].clientY - position.y,
      });
    }
  }

  function handleTouchMove(e) {
    e.preventDefault();
    e.stopPropagation();

    const touches = e.touches;

    if (isPinching && touches.length === 2) {
      const currentDist = getDistance(touches[0], touches[1]);
      if (touchStartDistance > 0) {
        const scaleFactor = currentDist / touchStartDistance;
        const newScale = pinchStartScale * scaleFactor;
        const clampedScale = Math.max(0.5, Math.min(newScale, 3));
        setScale(clampedScale);
      }
    } else if (isDragging && touches.length === 1) {
      const newX = touches[0].clientX - dragStart.x;
      const newY = touches[0].clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.touches.length < 2) {
      setIsPinching(false);
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
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
        className="relative h-[500px] w-full cursor-grab touch-none overflow-hidden active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            src={retrieveImageUrl("seatmaps", event.seatmap_file)}
            alt={`${event.artist} - ${event.title} seat map`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
