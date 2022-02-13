import { Tooltip } from '../Tooltip';

type InputProps = {
  label: string;
  placeholder?: string;
  name?: string;
  error?: string;
  type?: string;
  children?: JSX.Element;
};
export function Input({
  label,
  name,
  type,
  placeholder,
  error,
  children,
}: InputProps) {
  return (
    <div className="input">
      <div className="input-container">
        <span className="input-container__label">{label}</span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={
            error ? `${name ? name + '-' : ''}error` : undefined
          }
        />
        {children}
      </div>
      {!!error && <Tooltip name={name} text={error} />}
    </div>
  );
}
