import { JSX } from "react";
import { CarStatusEnum } from "@/commons/enums/Car";
import { Badge } from "../ui/badge";
import { translateEnum } from "@/commons/utils/enum-helpers";
import { FaCarBurst, FaCarOn, FaCartShopping, FaNewspaper, FaSearchengin, FaTag, FaTruckPickup } from "react-icons/fa6";

interface CarStatusBadgeProps {
  status: CarStatusEnum
}

export function CarStatusBadge({ status }: CarStatusBadgeProps) {
  const statusIconMap: Record<CarStatusEnum, JSX.Element> = {
    [CarStatusEnum.EVALUATING]: <FaSearchengin />,
    [CarStatusEnum.PURCHASED]: <FaCartShopping />,
    [CarStatusEnum.WINCH]: <FaTruckPickup />,
    [CarStatusEnum.MAINTENANCE]: <FaCarBurst />,
    [CarStatusEnum.AVAILABLE]: <FaCarOn />,
    [CarStatusEnum.ANNOUNCED]: <FaNewspaper />,
    [CarStatusEnum.SOLD]: <FaTag />,
  };

  const statusText = translateEnum('CarStatus', status);
  const statusIcon = statusIconMap[status];

  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      {statusIcon}
      <span className="ml-1.5">{statusText}</span>
    </Badge>
  );
}