"use client";

import { FaArrowTrendDown, FaArrowTrendUp, FaGripLines } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useGetFinancialSummary } from "@/hooks/swr/use-summary";
import { CardFinance } from "./card-finance";
import { StatusComparisonEnum } from "@/commons/enums/Finance";
import { PercentageBadge } from "./percentage-finance";

export default function OverviewFinances() {
  const { finance, isLoading } = useGetFinancialSummary()

  console.log('dados finanças', finance)

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!finance) {
    return <div>Erro ao carregar dados financeiros.</div>
  }

  const carsPurchasedText = finance.countPurchased !== 0 ? 
    finance.countPurchased > 1 ? 'carros comprados. ' : 'carro comprado. ' : 'Nenhum carro comprado. '

  const carsCostText = finance.countCost !== 0 ? 
    finance.countCost > 1 ? 'custos gerados. ' : 'custo gerado. ' : 'Nenhum custo gerado. '
  
  const carsSoldText = finance.countSold !== 0 ? 
    finance.countSold > 1 ? 'carros vendidos. ' : 'carro vendido. ' : 'Nenhum carro vendido. '

  //finance.comparison.amountPurchased

  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <CardFinance 
        title="Comprados" 
        description={(
          <>
            {finance.countPurchased > 0 && finance.countPurchased} {carsPurchasedText} {' '}
            {finance.comparison.amountPurchased.text}
          </>
        )} 
        amount={finance.amountPurchasedFormatted} 
        last={finance.lastPurchasedFormatted}
        percentage={(
          <PercentageBadge 
            status={finance.comparison.amountPurchased.status}
            statusText={`${finance.comparison.amountPurchased.percentage}%`}
          />
        )}
      />
      <CardFinance 
        title="Custos" 
        description={(
          <>
            {finance.countCost > 0 && finance.countCost} {carsCostText}
            {finance.comparison.amountCost.text}
          </>
        )} 
        amount={finance.amountCostFormatted} 
        last={finance.lastCostFormatted}
        percentage={(
          <PercentageBadge 
            status={finance.comparison.amountCost.status}
            statusText={`${finance.comparison.amountCost.percentage}%`}
          />
        )}
      />
      <CardFinance 
        title="Vendidos" 
        description={(
          <>
            {finance.countSold > 0 && finance.countSold} {carsSoldText}
            {finance.comparison.amountSold.text}
          </>
        )} 
        amount={finance.amountSoldFormatted} 
        last={finance.lastSoldFormatted}
        percentage={(
          <PercentageBadge 
            status={finance.comparison.amountSold.status}
            statusText={`${finance.comparison.amountSold.percentage}%`}
          />
        )}
      />
      <CardFinance 
        title="Faturamento" 
        description={(
          <>
            {finance.countProfit > 0 && finance.countProfit}
            {finance.comparison.amountProfit.text}
          </>
        )} 
        amount={finance.amountProfitFormatted} 
        last={finance.lastProfitFormatted}
        percentage={(
          <PercentageBadge 
            status={finance.comparison.amountProfit.status}
            statusText={`${finance.comparison.amountProfit.percentage}%`}
          />
        )}
      />
    </div>
  )
}