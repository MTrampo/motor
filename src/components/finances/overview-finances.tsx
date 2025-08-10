"use client";

import { FaArrowTrendUp, FaGripLines } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { getFinancialSummary } from "@/app/dashboard/action";

export default function OverviewFinances() {
  const { finance } = getFinancialSummary()

  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardDescription>Comprados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {finance?.amountPurchasedFormatted}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <FaArrowTrendUp  />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {finance?.countPurchased} carro(s) comprado(s) neste mês
            <FaArrowTrendUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {finance?.lastPurchasedFormatted}
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Manutenções</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {finance?.amountMaintenanceFormatted}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <FaArrowTrendUp  />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {finance?.countMaintenance} manutenção(ões) realizada(s) neste mês
            <FaArrowTrendUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {finance?.lastMaintenanceFormatted}
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Vendidos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {finance?.amountSoldFormatted}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {/* <FaArrowTrendUp  /> */}
              0%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {finance?.countSold} carro(s) vendido(s) neste mês
            <FaArrowTrendUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {finance?.lastSoldFormatted}
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Lucros</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {finance?.amountProfitFormatted}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {/* <FaGripLines  /> */}
              0%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {finance?.countProfit} vendas geraram lucro(s) neste mês
            <FaArrowTrendUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {finance?.lastProfitFormatted}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}