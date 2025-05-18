export default function EventInfo({ additionalInfo }) {
  if (!additionalInfo) return null;

  return (
    <span className="mb-8 rounded-md bg-accent p-4 text-accent-foreground">
      {additionalInfo}
    </span>
  );
}
