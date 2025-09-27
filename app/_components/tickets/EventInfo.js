export default function EventInfo({ additionalInfo }) {
  if (!additionalInfo) return null;

  const additionalInfoArray = additionalInfo
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((s) => s.trim());

  return (
    <div className="mb-8 rounded-xl bg-accent p-4 text-accent-foreground">
      {additionalInfoArray.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}
