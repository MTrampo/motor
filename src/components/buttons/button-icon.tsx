import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

type ButtonIconProps = {
  icon: ReactNode
  info: string
  onAction?(): void
}

export function ButtonIcon({ icon, info, onAction }: ButtonIconProps) {
  return(
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" onClick={onAction}>
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{info}</p>
      </TooltipContent>
    </Tooltip>
  )
}