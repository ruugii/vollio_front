export default function H3_component({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-xl font-semibold text-vollio-950 ${className}`}
    >
      {children}
    </h3>
  );
}