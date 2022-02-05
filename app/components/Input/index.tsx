type InputProps = {
  label: string;
  placeholder?: string;
  name?: string;
  type?: string;
  children?: JSX.Element;
};
export function Input({
  label,
  name,
  type,
  placeholder,
  children,
}: InputProps) {
  return (
    <div className="input-container">
      <span className="input-container__label">{label}</span>
      <input name={name} type={type} placeholder={placeholder} />
      {children}
    </div>
  );
}
