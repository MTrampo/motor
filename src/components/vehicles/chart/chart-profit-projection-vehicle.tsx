"use client"

import { useEffect, useMemo, useRef, useState } from "react" // Removido useState pois não é mais necessário
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { calculateProfitProjection } from "@/commons/utils/generate-data";
import { VehicleFormatted } from "@/commons/models/Vehicle"
import { currencyFormatter } from "@/commons/utils/formatter"
import { FaMoneyBillTrendUp } from "react-icons/fa6"
import { CostFormatted } from "@/commons/models/Cost"

export const description = "An interactive bar chart"

const chartConfig = {
  projectedProfit: {
    label: "Lucro"
  },
  resalePrice: {
    label: "Venda",
  },
} satisfies ChartConfig

type ProfitProjectionItem = {
  discount: number
  resalePrice: number
  projectedProfit: number
}

type ChartBarProfitProjectionProps = {
  vehicle: VehicleFormatted
  cost?: CostFormatted | null
}

export function ChartBarProfitProjection({ vehicle, cost }: ChartBarProfitProjectionProps) {
  const [clickedTooltip, setClickedTooltip] = useState<ProfitProjectionItem | null>(null)
  const [activeChartType, setActiveChartType] = useState<keyof typeof chartConfig>("resalePrice")

  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chartRef.current && !chartRef.current.contains(event.target as Node)) {
        setClickedTooltip(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [chartRef])

  useEffect(() => {
    setClickedTooltip(null);
  }, [activeChartType]);
  
  const { projection } = useMemo(() => {
    return calculateProfitProjection({ 
      fipeValue: vehicle.fipe ?? 0, 
      paidValue: vehicle.payment.total ?? 0, 
      totalCosts: cost?.total ?? 0
    })
  }, [vehicle, cost])

  return (
    <Card className="py-0 sm:gap-0 shadow-none" ref={chartRef}>
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-500">
            <FaMoneyBillTrendUp /> 
            Projeção de {chartConfig[activeChartType].label}
          </CardTitle>
          <CardDescription>
            Compare o lucro e o valor de venda projetados para cada cenário de desconto FIPE.
          </CardDescription>
        </div>
        <div className="flex">
          {["resalePrice", "projectedProfit"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChartType === chart}
                className="data-[active=true]:bg-muted/50 text-muted-foreground  data-[active=true]:font-semibold relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-4"
                onClick={() => setActiveChartType(chart)}
              >
                <span className="text-xs">
                  {chartConfig[chart].label}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={projection}
            margin={{
              left: 12,
              right: 12,
            }}
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload.length) {
                setClickedTooltip(state.activePayload[0].payload as ProfitProjectionItem);
              } else {
                setClickedTooltip(null);
              }
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="discount"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={20}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={-10}
              tickFormatter={(value) => currencyFormatter.format(value)}
            />
            <ChartTooltip
              active={!!clickedTooltip}
              cursor={false}
              content={
                clickedTooltip ? (
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey={activeChartType}
                    formatter={(value) => currencyFormatter.format(value as number)}
                  />
                ) : undefined
              }
            />
            <Bar dataKey={activeChartType} fill="var(--color-blue-500)" barSize={20}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mx-auto pb-6">
        <CardDescription className="p-0 text-center">
          Clique na barra para ver os detalhes da venda ou lucro projetado.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}