export default function H4_component({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={`text-lg font-semibold text-vollio-950 ${className}`}
    >
      {children}
    </h4>
  );
}