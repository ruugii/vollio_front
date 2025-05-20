export default function Input({
  value,
  onChange,
  type,
  placeholder,
  className,
  disabled,
}: {
  value: any;
  onChange: (arg0: any) => void;
  type: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
}) {
  const getclassName = () => {
    let className =
      "border border-vollio-300 p-2 rounded disabled:bg-vollio-200";
    if (className) {
      className += ` ${className}`;
    }
    return className;
  };
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={getclassName()}
      disabled={disabled}
    />
  );
}
