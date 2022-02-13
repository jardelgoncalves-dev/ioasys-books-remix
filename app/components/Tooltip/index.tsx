import { useEffect, useRef, useState } from 'react';

type TooltipProps = {
  text: string;
  name?: string;
};
export function Tooltip({ text, name }: TooltipProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (text && ref.current) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [text, ref]);

  return (
    <div
      ref={ref}
      className={`tooltip ${show ? '--show' : ''}`}
      role="alert"
      id={`${name ? name + '-' : ''}error`}
    >
      <p className="tooltip-container">{text}</p>
    </div>
  );
}
