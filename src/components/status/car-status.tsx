import { JSX } from "react";
import { CarStatusEnum } from "@/commons/enums/Car";
import { Badge } from "../ui/badge";
import { translateEnum } from "@/commons/utils/enum-helpers";
import { BiSolidCarGarage } from "react-icons/bi";
import { FaCarBurst, FaCarOn, FaNewspaper, FaSearchengin, FaTag, FaTruckPickup } from "react-icons/fa6";

interface CarStatusBadgeProps {
  status: CarStatusEnum
  className?: string
}

export function CarStatusBadge({ status, className }: CarStatusBadgeProps) {
  const statusIconMap: Record<CarStatusEnum, JSX.Element> = {
    [CarStatusEnum.EVALUATING]: <FaSearchengin />,
    [CarStatusEnum.PURCHASED]: <BiSolidCarGarage />,
    [CarStatusEnum.WINCH]: <FaTruckPickup />,
    [CarStatusEnum.MAINTENANCE]: <FaCarBurst />,
    [CarStatusEnum.AVAILABLE]: <FaCarOn />,
    [CarStatusEnum.ANNOUNCED]: <FaNewspaper />,
    [CarStatusEnum.SOLD]: <FaTag />,
  };

  const statusColorMap: Record<CarStatusEnum, string> = {
    [CarStatusEnum.EVALUATING]: 'text-orange-800 bg-orange-100',
    [CarStatusEnum.PURCHASED]: 'text-green-800 bg-green-100',
    [CarStatusEnum.WINCH]: 'text-blue-800 bg-blue-100',
    [CarStatusEnum.MAINTENANCE]: 'text-gray-800 bg-gray-200',
    [CarStatusEnum.AVAILABLE]: 'text-lime-800 bg-lime-100',
    [CarStatusEnum.ANNOUNCED]: 'text-indigo-800 bg-indigo-100',
    [CarStatusEnum.SOLD]: 'text-red-800 bg-red-100',
  };

  const statusText = translateEnum('CarStatusType', status);
  const statusIcon = statusIconMap[status];

  return (
    <Badge variant="outline" className={`px-1.5 ${statusColorMap[status]} ${className}`}>
      {statusIcon}
      <span>{statusText}</span>
    </Badge>
  );
}