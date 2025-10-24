import { CarStatusEnum } from "../enums/Car";

const statusTransitions: Record<CarStatusEnum, CarStatusEnum[]> = {
  [CarStatusEnum.EVALUATING]: [
    CarStatusEnum.AVAILABLE,
    CarStatusEnum.MAINTENANCE,
    CarStatusEnum.DOCUMENTATION
  ],
  [CarStatusEnum.PURCHASED]: [
    CarStatusEnum.WINCH,
    CarStatusEnum.MAINTENANCE,
    CarStatusEnum.DOCUMENTATION
  ],
  [CarStatusEnum.WINCH]: [
    CarStatusEnum.MAINTENANCE,
    CarStatusEnum.DOCUMENTATION
  ],
  [CarStatusEnum.MAINTENANCE]: [
    CarStatusEnum.AVAILABLE,
    CarStatusEnum.DOCUMENTATION
  ],
  [CarStatusEnum.DOCUMENTATION]: [
    CarStatusEnum.AVAILABLE,
    CarStatusEnum.MAINTENANCE
  ],
  [CarStatusEnum.AVAILABLE]: [
    CarStatusEnum.ANNOUNCED,
    CarStatusEnum.RENTED,
    CarStatusEnum.SOLD
  ],
  [CarStatusEnum.ANNOUNCED]: [
    CarStatusEnum.SOLD,
    CarStatusEnum.RENTED,
    CarStatusEnum.AVAILABLE
  ],
  [CarStatusEnum.RENTED]: [
    CarStatusEnum.EVALUATING,
    CarStatusEnum.SOLD
  ],
  [CarStatusEnum.SOLD]: []
};

export function getNextVehicleStatuses(currentStatus: CarStatusEnum): CarStatusEnum[] {
  return statusTransitions[currentStatus] ?? [];
}

export function isAvailableForSale(status: CarStatusEnum): boolean {
  const targetStatuses = [
    CarStatusEnum.AVAILABLE,
    CarStatusEnum.ANNOUNCED,
    CarStatusEnum.RENTED,
  ];

  return targetStatuses.includes(Number(status));
}