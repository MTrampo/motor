import { JSX } from "react";
import { CostTypeEnum } from "@/commons/enums/Cost";
import { Badge } from "../ui/badge";
import { translateEnum } from "@/commons/utils/enum-helpers";
import { FaFileLines, FaFileShield, FaGasPump, FaLandmark, FaMagnifyingGlassPlus, FaPeopleCarryBox, FaReceipt, FaScrewdriverWrench, FaSprayCanSparkles, FaTruckFast } from "react-icons/fa6";
import { GiCarWheel, GiMechanicGarage, GiSpeedometer, GiSpray, GiTowTruck, GiTurbine, GiVacuumCleaner } from "react-icons/gi";
import { MdCarRental, MdCarRepair, MdElectricCar, MdEngineering } from "react-icons/md";

interface CostTypeBadgeProps {
  type: CostTypeEnum
}

const typeIconMap: Record<CostTypeEnum, JSX.Element> = {
  [CostTypeEnum.WINCH]: <GiTowTruck />,
  [CostTypeEnum.TRANSPORT]: <FaTruckFast />,
  [CostTypeEnum.MAINTENANCE]: <FaScrewdriverWrench />,
  [CostTypeEnum.INSPECTION]: <FaMagnifyingGlassPlus />,
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
  [CostTypeEnum.AESTHETICS]: <FaSprayCanSparkles />,
  [CostTypeEnum.DEBITS]: <FaReceipt />,
  [CostTypeEnum.WASH]: <GiVacuumCleaner />,
  [CostTypeEnum.FUEL]: <FaGasPump />,
  [CostTypeEnum.FINE]: <FaLandmark />,
  [CostTypeEnum.DISPATCHING]: <FaPeopleCarryBox />,
}

export function CostTypeBadge({ type }: CostTypeBadgeProps) {
  const typeText = translateEnum('CostType', type);
  const typeIcon = typeIconMap[type];

  return (
    <Badge variant="outline" className="px-1.5 text-gray-800 bg-gray-200">
      {typeIcon}
      <span className="ml-0.5">{typeText}</span>
    </Badge>
  );
}

export function CostTypeText({ type }: CostTypeBadgeProps) {
  const typeText = translateEnum('CostType', type);
  const typeIcon = typeIconMap[type];

  return (
    <span className="flex gap-2 items-center">
      {typeIcon}
      <span>{typeText}</span>
    </span>
  );
}