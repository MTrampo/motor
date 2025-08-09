import { AuctionTypeEnum, DamageTypeEnum } from "../enums/Auction";
import { CarConditionTypeEnum, CarStatusEnum } from "../enums/Car";


const carStatusTranslations: Record<CarStatusEnum, string> = {
  [CarStatusEnum.EVALUATING]: "Em Avaliação",
  [CarStatusEnum.PURCHASED]: "Comprado",
  [CarStatusEnum.WINCH]: "Em tranporte",
  [CarStatusEnum.MAINTENANCE]: "Em Manutenção",
  [CarStatusEnum.AVAILABLE]: "Disponível",
  [CarStatusEnum.ANNOUNCED]: "Anunciado",
  [CarStatusEnum.SOLD]: "Vendido",
};

const carConditionTypeTranslations: Record<CarConditionTypeEnum, string> = {
  [CarConditionTypeEnum.COLLISION]: "Colisão",
  [CarConditionTypeEnum.THEFT]: "Roubo/Furto",
  [CarConditionTypeEnum.FLOOD]: "Enchente",
  [CarConditionTypeEnum.FIRE]: "Incêndio",
  [CarConditionTypeEnum.FINANCIAL]: "Financeiro",
  [CarConditionTypeEnum.CONSORTIUM]: "Consórcio",
  [CarConditionTypeEnum.VMC]: "VMC",
  [CarConditionTypeEnum.OTHER]: "Outro",
};

const auctionTypeTranslations: Record<AuctionTypeEnum, string> = {
  [AuctionTypeEnum.START]: "Motor dá partida",
  [AuctionTypeEnum.START_AND_GEAR]: "Motor dá partida e engrena",
  [AuctionTypeEnum.DOESNT_START]: "Veículo não Liga",
};

const damageTypeTranslations: Record<DamageTypeEnum, string> = {
  [DamageTypeEnum.SMALL_VALUE]: "Pequena Monta",
  [DamageTypeEnum.MEDIUM_VALUE]: "Média Monta",
  [DamageTypeEnum.BIG_VALUE]: "Grande Monta",
};

const translations = {
  CarStatus: carStatusTranslations,
  CarConditionType: carConditionTypeTranslations,
  AuctionType: auctionTypeTranslations,
  DamageType: damageTypeTranslations,
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