import * as React from "react";
import { cn } from "@/commons/lib/utils";
import { Input } from "./input";

interface InputIconProps extends React.ComponentProps<typeof Input> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onIconRightClick?: () => void;
}

const InputIcon = React.forwardRef<HTMLInputElement, InputIconProps>(
  (
    { className, iconLeft, iconRight, onIconRightClick, type, ...props },
    ref
  ) => {
    return (
      <div className={cn("relative flex w-full max-w-72", className)}>
        {iconLeft && (
          <span className="pointer-events-none absolute left-0 top-1/2 z-10 -translate-y-1/2 transform p-3 text-muted-foreground">
            {iconLeft}
          </span>
        )}

        <Input
          type={type}
          className={cn(
            "w-full",
            iconLeft && "pl-10",
            iconRight && "pr-10",
          )}
          ref={ref}
          {...props}
        />

        {iconRight && (
          <div
            className={cn(
              "absolute right-0 top-1/2 z-10 -translate-y-1/2 transform p-3 text-muted-foreground",
              onIconRightClick && "cursor-pointer"
            )}
            onClick={onIconRightClick}
          >
            {iconRight}
          </div>
        )}
      </div>
    );
  }
);

InputIcon.displayName = "InputIcon";

export { InputIcon };