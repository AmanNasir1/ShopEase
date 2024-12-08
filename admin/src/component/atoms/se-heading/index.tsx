import { HTMLAttributes } from "react";
import { cn } from "../../../utils/helper/tailwind-helper";

export interface SEHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
}

export default function SEHeading({
  className,
  children,
  variant = "xl",
  ...props
}: SEHeadingProps) {
  return (
    <h1
      className={cn("text-xl text-heading", className, {
        "text-base font-medium": variant === "xs",
        "text-lg font-medium": variant === "sm",
        "text-xl font-medium": variant === "md",
        "text-lg font-semibold": variant === "lg",
        "text-xl font-bold": variant === "xl",
        "text-2xl font-bold": variant === "2xl",
      })}
      {...props}
    >
      {children}
    </h1>
  );
}
