import Link from "next/link";

export default function MenuItem({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`hover:text-vollio-900 hover:underline ${className}`}
      >
        {children}
      </Link>
    </li>
  );
}
