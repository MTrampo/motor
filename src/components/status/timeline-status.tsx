import { cn } from "@/commons/lib/utils"
import { ReactNode } from "react"
import { statusIconMap } from "./status-map"
import { translateEnum } from "@/commons/utils/enum-helpers"
import { CarStatusEnum } from "@/commons/enums/Car"
import { VehicleStatusHistoryItemFormatted } from "@/commons/models/Vehicle"

type TimelineProps = {
  history: VehicleStatusHistoryItemFormatted,
}

export function TimelineStatus({ history }: TimelineProps) {
  const statusTitle = translateEnum('CarStatusType', history.status);
  const statusIcon = statusIconMap[history.status];
  
  return (
    <div className="relative flex items-start gap-3 pb-6 last:pb-0">
      <span className="absolute left-2 top-6 h-[calc(100%-1.5rem)] w-0.5 bg-blue-500" />
      <span className="flex h-5 w-5 items-center justify-center">
        <span className="text-lg">
          {statusIcon}
        </span>
      </span>
      <div>
        <p className={cn("text-sm font-medium text-muted-foreground")}>
          {statusTitle}
        </p>
        <p className="text-sm text-muted-foreground">
          {history.startedAtAndendedAtFormatted}
        </p>
        <p className="text-xs text-muted-foreground">
          {history.reason}
        </p>
      </div>
    </div>
  )
}