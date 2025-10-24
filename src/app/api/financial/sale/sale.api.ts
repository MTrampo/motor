import { VehicleSaleDocData, SellVehicleRequestBody, VehicleSaleFirestore, VehicleSalesPerformanceAnalysis, formatVehicleSold } from "@/commons/models/Sale";
import { addVehicleSale, getSaleByIdDocs } from "./sale.firestore";
import { updateStatusSold } from "../vehicle/status/status.api";
import { addFinanceSale } from "../summary/summary.api";
import { FinanceTypeEnum } from "@/commons/enums/Finance";
import { ResponseProps } from "@/commons/models/Api";
import { NotFound } from "@/commons/errors/generic";
import { ErrorCode } from "@/commons/enums/Api";
import { SaleClassificationEnum } from "@/commons/enums/Payment";
import { MARGEM_HIGH_VALUE, MARGEM_MEDIUM_VALUE } from "@/commons/constants/sale";
import globalResponses from "@/commons/utils/responses";

export const getVehicleSoldById = async (teamId: string, plate: string) => {
  const sale = await getSaleByIdDocs(teamId, plate)
  if (!sale) throw new NotFound(ErrorCode.SALE_NOT_FOUND);

  const analysis = analyzeSalesPerformance(sale);

  const formattedData = formatVehicleSold(sale, analysis);
  return globalResponses.soldFound(formattedData)
}

export const sellVehicle = async (teamId: string, body: SellVehicleRequestBody) => {
  const saleDate = new Date(body.saleDate);
  const today = new Date();

  const docData: VehicleSaleDocData = {
    purchasePrice: body.purchase,
    sellerId: body.sellerId,
    saleDate: saleDate,
    salePrice: body.salePrice,
    paymentMethod: body.paymentMethod,
    totalCost: body.totalCost,
    buyerId: body.buyerId ?? null,
    notes: body.notes ?? null,
    createdAt: today,
    updatedAt: today,
  };

  const saleId = await addVehicleSale(teamId, body.plate, docData);
  await updateStatusSold(teamId, body.plate, saleDate, body.previousStatusDocumentId);
  await addFinanceSale(teamId, body.salePrice, saleDate, body.totalCost, FinanceTypeEnum.SALE);

  const result: ResponseProps<string> = {
    title: 'Atualizado',
    message: `Finança atualizada com sucesso!`,
    data: saleId
  }

  return result
}

function analyzeSalesPerformance(data: VehicleSaleFirestore) {
  // Cálculo do Lucro Bruto (Valor Absoluto)
  const realTotalCost = (data.purchasePrice + data.totalCost);
  const grossProfit = (data.salePrice - realTotalCost); 

  // Cálculo da Margem Bruta Percentual
  const grossMarginPercentage = (grossProfit / data.salePrice);
  const formattedPercentage = `${(grossMarginPercentage * 100).toFixed(2)}%`;

  // Cálculo do ROI (Retorno sobre o Investimento)
  const roiPercentage = (grossProfit / realTotalCost);
  const roiFormatted = `${(roiPercentage * 100).toFixed(2)}%`;

  let classification: SaleClassificationEnum;
  let description: string;

  if (grossMarginPercentage >= MARGEM_HIGH_VALUE) {
    classification = SaleClassificationEnum.HIGH_PERFORMANCE;
    description = `**PÓDIO GARANTIDO!** Com **${formattedPercentage}** de **Margem Bruta** o investimento foi limpo e o retorno, brutal. Isso aconteceu porque o Custo Total do Veículo (Compra + Preparação) foi totalmente ajustado para o lucro, gerando uma gordura sólida. Busque repetir esta performance na aquisição dos próximos veículos.`;
  } else if (grossMarginPercentage >= MARGEM_MEDIUM_VALUE) {
    classification = SaleClassificationEnum.MEDIUM_PERFORMANCE;
    description = `**ESTABILIDADE NA PISTA!** A **Margem Bruta** de **${formattedPercentage}** mantém o carro na pista com **voltas sólidas**. O Custo Total do Veículo (Compra + Preparação) está na média, mas podemos melhorar. **Para garantir ultrapassagens**, identifique pontos de otimização nos custos para ganhar velocidade e assegurar seu lugar no pódio!`;
  } else { 
    classification = SaleClassificationEnum.LOW_PERFORMANCE;
    description = `**SAFETY CAR NA PISTA!** A **Margem Bruta** de **${formattedPercentage}** é um sinal de **ALERTA MÁXIMO**. O Custo Total do Veículo (Compra + Preparação) foi o nosso acidente, resultando em margem perigosamente baixa. **ENTRE AGORA NO BOX!** Precisamos **revisar o nível do óleo** (*negociação de compra*) e as **velas de ignição** (*custos de preparação*) urgentemente para evitar a quebra do motor!`;
  }

  const analysis: VehicleSalesPerformanceAnalysis = {
    realTotalCost,
    grossProfit,
    grossMarginPercentage,
    roiPercentage,
    roiPercentageFormatted: roiFormatted,
    grossMarginPercentageFormatted: formattedPercentage,
    classification,
    descriptionClassification: description,
  };

  return analysis
}