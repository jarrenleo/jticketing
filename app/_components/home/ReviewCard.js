// "use client";

import Link from "next/link";
import { Quote } from "lucide-react";
import Facebook from "../icons/Facebook";

export default function ReviewCard({ review }) {
  return (
    <Link href={review.link} target="_blank" rel="noopener noreferrer">
      <div className="flex flex-col justify-center rounded-md bg-muted p-6 transition-colors hover:bg-accent hover:text-accent-foreground">
        <Quote width={24} height={24} style={{ transform: "scaleX(-1)" }} />

        <div className="flex h-48 items-center">
          <p>{review.quote}</p>
        </div>

        <div className="mb-2 flex justify-end">
          <Quote width={24} height={24} />
        </div>

        <div className="mb-4 text-sm font-bold">{review.name}</div>

        <div className="flex items-center gap-2 text-sm">
          <Facebook width={16} height={16} className="fill-muted-foreground" />
          <span className="text-muted-foreground">Facebook Reviews</span>
        </div>
      </div>
    </Link>
  );
}
