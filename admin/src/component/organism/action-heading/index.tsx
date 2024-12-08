import SEHeading from "../../atoms/se-heading";

import { HTMLAttributes, ReactNode } from "react";
import { SEHeadingProps } from "../../atoms/se-heading";
import { cn } from "../../../utils/helper/tailwind-helper";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface AdminDashboardProps {
  allowBack?: boolean;
  onBack?: () => void;
  className?: HTMLAttributes<HTMLDivElement["className"]>;
  leftChildren?: ReactNode;
  actions?: JSX.Element[] | ReactNode;
  heading: string;
  subHeading?: string;
  actionClassName?: HTMLAttributes<HTMLDivElement["className"]>;
  headingVariant?: SEHeadingProps["variant"];
}

export default function ActionHeading({
  allowBack = true,
  onBack,
  className,
  leftChildren,
  actions,
  heading,
  subHeading,
  actionClassName,
  headingVariant,
}: AdminDashboardProps) {
  const navigate = useNavigate();

  function handleBack() {
    if (onBack) {
      return onBack();
    } else {
      navigate(-1);
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between md:min-h-[38px]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {allowBack && (
          <h1 className="cursor-pointer" onClick={handleBack}>
            <LeftOutlined />
          </h1>
        )}
        <div className="flex flex-col gap-1">
          <SEHeading variant={headingVariant}>{heading}</SEHeading>
          <span className="text-heading">{subHeading}</span>
        </div>
        {leftChildren}
      </div>
      {/* Right */}
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-3",
          actionClassName
        )}
      >
        {Array.isArray(actions)
          ? actions.map((action) => <div key={Math.random()}>{action}</div>)
          : actions}
      </div>
    </div>
  );
}
