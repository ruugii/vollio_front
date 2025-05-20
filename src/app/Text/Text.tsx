export default function Text({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-lg text-vollio-950 ${className}`}
    >
      {children}
    </p>
  );
}