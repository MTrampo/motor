import { AuctionTypeEnum, DamageTypeEnum } from "@/commons/enums/Auction";
import { CarConditionTypeEnum, CarStatusEnum } from "@/commons/enums/Car";
import { CostTypeEnum } from "../enums/Cost";

export const carStatusTranslations: Record<CarStatusEnum, string> = {
  [CarStatusEnum.EVALUATING]: "Em Avaliação",
  [CarStatusEnum.PURCHASED]: "Comprado",
  [CarStatusEnum.WINCH]: "Em tranporte",
  [CarStatusEnum.MAINTENANCE]: "Em Manutenção",
  [CarStatusEnum.AVAILABLE]: "Disponível",
  [CarStatusEnum.ANNOUNCED]: "Anunciado",
  [CarStatusEnum.SOLD]: "Vendido",
};

export const carConditionTypeTranslations: Record<CarConditionTypeEnum, string> = {
  [CarConditionTypeEnum.COLLISION]: "Colisão",
  [CarConditionTypeEnum.THEFT]: "Roubo/Furto",
  [CarConditionTypeEnum.FLOOD]: "Enchente",
  [CarConditionTypeEnum.FIRE]: "Incêndio",
  [CarConditionTypeEnum.FINANCIAL]: "Financeiro",
  [CarConditionTypeEnum.CONSORTIUM]: "Consórcio",
  [CarConditionTypeEnum.VMC]: "VMC",
  [CarConditionTypeEnum.OTHER]: "Outro",
};

export const auctionTypeTranslations: Record<AuctionTypeEnum, string> = {
  [AuctionTypeEnum.START]: "Motor dá partida",
  [AuctionTypeEnum.START_AND_GEAR]: "Motor dá partida e engrena",
  [AuctionTypeEnum.DOESNT_START]: "Veículo não Liga",
};

export const damageTypeTranslations: Record<DamageTypeEnum, string> = {
  [DamageTypeEnum.SMALL_VALUE]: "Pequena Monta",
  [DamageTypeEnum.MEDIUM_VALUE]: "Média Monta",
  [DamageTypeEnum.BIG_VALUE]: "Grande Monta",
};

export const costTypeTranslations: Record<CostTypeEnum, string> = {
  [CostTypeEnum.WINCH]: "Guincho",
  [CostTypeEnum.TRANSPORT]: "Transporte",
  [CostTypeEnum.MAINTENANCE]: "Manutenção",
  [CostTypeEnum.INSPECTION]: "Inspeção",
  [CostTypeEnum.DOCUMENTATION]: "Documentação",
  [CostTypeEnum.PART_WHEELS_TIRES]: "Peça - Rodas/Pneus",
  [CostTypeEnum.PART_MECHANICAL]: "Peça - Mecânica",
  [CostTypeEnum.PART_BODYWORK]: "Peça - Lataria",
  [CostTypeEnum.PART_INTERNAL]: "Peça - Interna",
  [CostTypeEnum.PART_ELECTRICAL]: "Peça - Elétrica",
  [CostTypeEnum.PAINTING]: "Pintura",
  [CostTypeEnum.MECHANICAL]: "Mecânico",
  [CostTypeEnum.TECHNICIAN]: "Funileiro",
  [CostTypeEnum.KEYCHAIN]: "Chaveiro",
  [CostTypeEnum.INSURANCE]: "Seguro"
}

const translations = {
  CarStatus: carStatusTranslations,
  CarConditionType: carConditionTypeTranslations,
  AuctionType: auctionTypeTranslations,
  DamageType: damageTypeTranslations,
  CostType: costTypeTranslations,
};

export function translateEnum<T extends keyof typeof translations, K extends keyof typeof translations[T]>(
  enumName: T,
  enumValue: K
): string {
  const translationMap = translations[enumName] as Record<K, string>;
  
  if (translationMap && translationMap[enumValue]) {
    return translationMap[enumValue];
  }

  return String(enumValue);
}