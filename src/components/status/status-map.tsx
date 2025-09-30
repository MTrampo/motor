import { JSX } from "react";
import { CarStatusEnum } from "@/commons/enums/Car";
import { BiSolidCarGarage } from "react-icons/bi";
import { FaCarBurst, FaCarOn, FaFileInvoiceDollar, FaFileLines, FaNewspaper, FaSearchengin, FaTag } from "react-icons/fa6";
import { GiTowTruck } from "react-icons/gi";

export const statusIconMap: Record<CarStatusEnum, JSX.Element> = {
  [CarStatusEnum.EVALUATING]: <FaSearchengin />,
  [CarStatusEnum.PURCHASED]: <BiSolidCarGarage />,
  [CarStatusEnum.WINCH]: <GiTowTruck />,
  [CarStatusEnum.MAINTENANCE]: <FaCarBurst />,
  [CarStatusEnum.DOCUMENTATION]: <FaFileLines />,
  [CarStatusEnum.AVAILABLE]: <FaCarOn />,
  [CarStatusEnum.ANNOUNCED]: <FaNewspaper />,
  [CarStatusEnum.RENTED]: <FaFileInvoiceDollar />,
  [CarStatusEnum.SOLD]: <FaTag />,
};

export const statusColorMap: Record<CarStatusEnum, string> = {
  [CarStatusEnum.EVALUATING]: 'text-orange-800 bg-orange-100',
  [CarStatusEnum.PURCHASED]: 'text-green-800 bg-green-100',
  [CarStatusEnum.WINCH]: 'text-blue-800 bg-blue-100',
  [CarStatusEnum.MAINTENANCE]: 'text-gray-800 bg-gray-200',
  [CarStatusEnum.DOCUMENTATION]: 'text-gray-800 bg-gray-200',
  [CarStatusEnum.AVAILABLE]: 'text-lime-800 bg-lime-100',
  [CarStatusEnum.ANNOUNCED]: 'text-indigo-800 bg-indigo-100',
  [CarStatusEnum.RENTED]: 'text-red-800 bg-red-100',
  [CarStatusEnum.SOLD]: 'text-red-800 bg-red-100',
};