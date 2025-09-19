import { StatusComparisonEnum } from "@/commons/enums/Finance";
import { JSX } from "react";
import { FaArrowTrendDown, FaArrowTrendUp, FaMinus } from "react-icons/fa6";
import { Badge } from "../ui/badge";

interface PercentageStatusBadgeProps {
  negative?: boolean
  className?: string
  statusText?: string
  status: StatusComparisonEnum
}

export function PercentageBadge({ negative = false, status, statusText, className }: PercentageStatusBadgeProps) {
  const statusIconMap: Record<StatusComparisonEnum, JSX.Element> = {
    [StatusComparisonEnum.LOW]: negative ? <FaArrowTrendUp /> : <FaArrowTrendDown />,
    [StatusComparisonEnum.STABLE]: <FaMinus />,
    [StatusComparisonEnum.HIGH]: negative ? <FaArrowTrendDown /> : <FaArrowTrendUp />,
  };

  const statusColorMap: Record<StatusComparisonEnum, string> = {
    [StatusComparisonEnum.LOW]: negative ? 'text-green-800 bg-green-100 border-green-800' : 'text-red-800 bg-red-100',
    [StatusComparisonEnum.STABLE]: 'text-gray-800 bg-gray-200',
    [StatusComparisonEnum.HIGH]: negative ? 'text-red-800 bg-red-100' : 'text-green-800 bg-green-100 border-green-800',
  };

  const statusIcon = statusIconMap[status];

  return (
    <Badge variant="outline" className={`px-1.5 ${statusColorMap[status]} ${className}`}>
      {statusIcon}
      <span>{statusText}</span>
    </Badge>
  );
}