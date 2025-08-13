import { JSX } from "react";
import { CostTypeEnum } from "@/commons/enums/Cost";
import { Badge } from "../ui/badge";
import { translateEnum } from "@/commons/utils/enum-helpers";
import { FaFileLines, FaFileShield, FaScrewdriverWrench, FaTag, FaTruckPickup } from "react-icons/fa6";
import { GiCarWheel, GiMechanicGarage, GiSpeedometer, GiSpray, GiTowTruck, GiTurbine } from "react-icons/gi";
import { MdCarRental, MdCarRepair, MdElectricCar, MdEngineering } from "react-icons/md";

interface CostTypeBadgeProps {
  type: CostTypeEnum
}

export function CostTypeBadge({ type }: CostTypeBadgeProps) {
  const typeIconMap: Record<CostTypeEnum, JSX.Element> = {
    [CostTypeEnum.TRANSPORT]: <GiTowTruck />,
    [CostTypeEnum.MAINTENANCE]: <FaScrewdriverWrench />,
    [CostTypeEnum.INSPECTION]: <FaTruckPickup />,
    [CostTypeEnum.DOCUMENTATION]: <FaFileLines />,
    [CostTypeEnum.PART_WHEELS_TIRES]: <GiCarWheel />,
    [CostTypeEnum.PART_MECHANICAL]: <GiTurbine />,
    [CostTypeEnum.PART_BODYWORK]: <MdCarRepair />,
    [CostTypeEnum.PART_INTERNAL]: <GiSpeedometer />,
    [CostTypeEnum.PART_ELECTRICAL]: <MdElectricCar />,
    [CostTypeEnum.PAINTING]: <GiSpray />,
    [CostTypeEnum.MECHANICAL]: <MdEngineering />,
    [CostTypeEnum.TECHNICIAN]: <GiMechanicGarage />,
    [CostTypeEnum.KEYCHAIN]: <MdCarRental />,
    [CostTypeEnum.INSURANCE]: <FaFileShield />,
  };

  const statusText = translateEnum('CostType', type);
  const statusIcon = typeIconMap[type];

  return (
    <Badge variant="outline" className="px-1.5 text-gray-800 bg-gray-200">
      {statusIcon}
      <span className="ml-0.5">{statusText}</span>
    </Badge>
  );
}