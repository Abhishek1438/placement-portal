export function Banner({ title }) {
  return (
    <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center">{title}</h1>
    </div>
  );
}
