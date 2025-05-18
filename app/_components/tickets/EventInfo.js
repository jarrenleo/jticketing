import { Info } from "lucide-react";

export default function EventInfo({ additionalInfo }) {
  if (!additionalInfo) return null;

  return (
    <div className="mb-8 flex items-center gap-2 rounded-md bg-accent p-4 text-accent-foreground">
      <Info height={16} width={16} />
      <p className="text-base">{additionalInfo}</p>
    </div>
  );
}
