import { HTMLAttributes } from "react";
import { cn } from "../../../utils/helper/tailwind-helper";

export interface SEContainerProps extends HTMLAttributes<HTMLDivElement> {}

export default function SEContainer({
  children,
  className,
  ...props
}: SEContainerProps) {
  return (
    <div className={cn("rounded-[10px] bg-white p-5", className)} {...props}>
      {children}
    </div>
  );
}
