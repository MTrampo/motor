import { JSX } from "react";
import { CarStatusEnum } from "@/commons/enums/Car";
import { Badge } from "../ui/badge";
import { translateEnum } from "@/commons/utils/enum-helpers";
import { statusColorMap, statusIconMap } from "./status-map";


interface CarStatusBadgeProps {
  status: CarStatusEnum
  className?: string
}

export function CarStatusBadge({ status, className }: CarStatusBadgeProps) {
  const statusText = translateEnum('CarStatusType', status);
  const statusIcon = statusIconMap[status];

  return (
    <Badge variant="outline" className={`px-1.5 ${statusColorMap[status]} ${className}`}>
      {statusIcon}
      <span>{statusText}</span>
    </Badge>
  );
}