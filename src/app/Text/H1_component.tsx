export default function H1_component({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`text-4xl font-bold text-vollio-950 ${className}`}
    >
      {children}
    </h1>
  );
}