"use client";

import Image from "next/image";
import { useGetFinancialSummarySWR } from "@/hooks/swr/use-summary";
import { CardFinance, CardFinanceLoading } from "./card-finance";
import { PercentageBadge } from "./percentage-finance";
import svgFinance from '@/commons/assets/svgs/finance-dashboard.svg'

export default function OverviewFinances() {
  const { finance, isLoading } = useGetFinancialSummarySWR()

  if (isLoading) {
    return(
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardFinanceLoading/>
        <CardFinanceLoading/>
        <CardFinanceLoading/>
        <CardFinanceLoading/>
      </div>
    )
  }

  if (!finance) {
    return(
      <div className="flex flex-col gap-10 mt-16">
        <Image src={svgFinance} className="mx-auto w-lg" alt="carro em manutenção" width={400} height={400} priority/>
        <div className="text-center text-muted-foreground">
          <p>
            O motor da sua gestão ainda está frio, mas não se preocupe.
          </p>
          <p>
            Registre os primeiros custos e receitas para aquecê-lo e ver os números da sua corrida.
          </p>
        </div>
      </div>
    )
  }

  const carsPurchasedText = finance.countPurchased !== 0 ? 
    finance.countPurchased > 1 ? 'carros comprados. ' : 'carro comprado. ' : 'Nenhum carro comprado. '

  const carsCostText = finance.countCost !== 0 ? 
    finance.countCost > 1 ? 'custos gerados. ' : 'custo gerado. ' : 'Nenhum custo gerado. '
  
  const carsSoldText = finance.countSold !== 0 ? 
    finance.countSold > 1 ? 'carros vendidos. ' : 'carro vendido. ' : 'Nenhum carro vendido. '

  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <CardFinance 
        title="Adquiridos" 
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
            negative
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