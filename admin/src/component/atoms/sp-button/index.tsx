import { Button, ButtonProps } from "antd";
import { cn } from "../../../utils/helper/tailwind-helper";

export interface SEButtonProps extends ButtonProps {}

export default function SEButton({
  className,
  children,
  ...props
}: SEButtonProps) {
  return (
    <Button
      className={cn("flex items-center justify-center shadow-none", className)}
      {...props}
    >
      {children}
    </Button>
  );
}
