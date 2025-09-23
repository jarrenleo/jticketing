export default function EventInfo({ additionalInfo }) {
  if (!additionalInfo) return null;

  return (
    <div className="mb-8 rounded-xl bg-accent p-4 text-accent-foreground">
      <p>{additionalInfo}</p>
    </div>
  );
}
