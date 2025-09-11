import { StatusComparisonEnum } from "@/commons/enums/Finance";
import { JSX } from "react";
import { FaArrowTrendDown, FaArrowTrendUp, FaMinus } from "react-icons/fa6";
import { Badge } from "../ui/badge";

interface PercentageStatusBadgeProps {
  className?: string
  statusText?: string
  status: StatusComparisonEnum
}

export function PercentageBadge({ status, statusText, className }: PercentageStatusBadgeProps) {
  const statusIconMap: Record<StatusComparisonEnum, JSX.Element> = {
    [StatusComparisonEnum.LOW]: <FaArrowTrendDown />,
    [StatusComparisonEnum.STABLE]: <FaMinus />,
    [StatusComparisonEnum.HIGH]: <FaArrowTrendUp />,
  };

  const statusColorMap: Record<StatusComparisonEnum, string> = {
    [StatusComparisonEnum.LOW]: 'text-red-800 bg-red-100',
    [StatusComparisonEnum.STABLE]: 'text-gray-800 bg-gray-200',
    [StatusComparisonEnum.HIGH]: 'text-green-800 bg-green-100 border-green-800',
  };

  const statusIcon = statusIconMap[status];

  return (
    <Badge variant="outline" className={`px-1.5 ${statusColorMap[status]} ${className}`}>
      {statusIcon}
      <span>{statusText}</span>
    </Badge>
  );
}