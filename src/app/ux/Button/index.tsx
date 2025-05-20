import { ReactNode } from "react";

export default function Button({
  children,
  type,
  className,
  onClick,
}: {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type={type}
      className={`bg-vollio-300 text-vollio-950 p-2 rounded hover:bg-vollio-400 disabled:bg-vollio-200 transition duration-200 hover:cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
