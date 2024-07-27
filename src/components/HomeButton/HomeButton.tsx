import React, {
  ButtonHTMLAttributes,
  FC,
  JSXElementConstructor,
  forwardRef,
  useRef,
} from "react";
import cn from "clsx";
import s from "./HomeButton.module.css";
import { mergeRefs } from "react-merge-refs";
import LoadingDots from "../LoadingDots";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  variant?: "flat" | "slim" | "ghost" | "naked";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  Component?: string | JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
}
const Button: FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const ref = useRef<typeof Component>(null);
  const {
    className,
    variant = "flat",
    children,

    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props;
  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === "ghost",
      [s.slim]: variant === "slim",
      [s.naked]: variant === "naked",
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});
Button.displayName = "Button";

export default Button;
