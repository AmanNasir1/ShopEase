import { HTMLAttributes, ReactNode } from "react";
import ActionHeading from "../action-heading";
import { cn } from "../../../utils/helper/tailwind-helper";

interface DashboardPageProps extends HTMLAttributes<HTMLDivElement> {
  heading: string;
  headingClass?: HTMLAttributes<HTMLDivElement["className"]>;
  actions?: JSX.Element[] | ReactNode;
  onBack?: () => void;
  leftActionChildren?: ReactNode;
  allowBack?: boolean;
  actionClassName?: HTMLAttributes<HTMLDivElement["className"]>;
}

export default function DashboardPage({
  heading,
  children,
  headingClass,
  className,
  actions,
  onBack,
  leftActionChildren,
  allowBack,
  actionClassName,
  ...props
}: DashboardPageProps) {
  return (
    <div
      className={cn(
        "flex h-[calc(100vh-64px)] flex-col p-5 overflow-auto",
        className
      )}
      {...props}
    >
      <ActionHeading
        heading={heading}
        className={headingClass}
        actions={actions}
        onBack={onBack}
        leftChildren={leftActionChildren}
        allowBack={allowBack}
        actionClassName={actionClassName}
      />
      {children}
    </div>
  );
}
