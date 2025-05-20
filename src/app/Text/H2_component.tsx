export default function H2_component({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl font-bold text-vollio-950 ${className}`}
    >
      {children}
    </h2>
  );
}