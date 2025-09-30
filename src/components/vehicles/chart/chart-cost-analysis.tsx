"use client"

import { Cell, Pie, PieChart, TooltipProps } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { CostFormatted } from "@/commons/models/Cost"
import { useEffect, useMemo, useRef, useState } from "react"
import { currencyFormatter } from "@/commons/utils/formatter"
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"
import { CostTypeBadge, CostTypeText } from "../cost-type"
import { translateEnum } from "@/commons/utils/enum-helpers"
import { FaScrewdriverWrench } from "react-icons/fa6"

interface PayloadItem {
  type: number;
  name: string;
  value: number;
  payload: {
    name: string;
    value: number;
  };
}

type CustomTooltipProps = TooltipProps<ValueType, NameType> & {
  totalCost: number
}

const CustomTooltipContent = ({ active, payload, totalCost }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as PayloadItem;
    const percentage = (data.value / totalCost) * 100;

    return (
      <div className="rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md">
        <CostTypeText type={data.type}/>
        <p className="text-muted-foreground">{`${currencyFormatter.format(data.value)} - ${percentage.toFixed(0)}%`}</p>
      </div>
    );
  }

  return null
}

type ChartCostAnalysisProps = {
  cost: CostFormatted
}

export function ChartCostAnalysis({ cost }: ChartCostAnalysisProps) {
  const [clickedTooltip, setClickedTooltip] = useState<PayloadItem | null>(null)
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

  const chartData = useMemo(() => {
    const dataByType: Record<string, number> = {}
    const typeColors: Record<string, string> = {}

    let colorIndex = 0
    const colorValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    cost.items.forEach(item => {
      const type = item.type
      if (!dataByType[type]) {
        dataByType[type] = 0
        typeColors[type] = `var(--chart-${colorValues[colorIndex++ % colorValues.length]})`
      }
      dataByType[type] += item.value
    })

    const chartDataArray = Object.keys(dataByType).map(type => ({
      type: Number(type),
      name: translateEnum('CostType', Number(type)),
      value: dataByType[type],
      fill: typeColors[type]
    }))

    return chartDataArray
}, [cost])

  const chartConfig = useMemo(() => {
    const dynamicConfig: ChartConfig = {}

    chartData.forEach(data => {
      dynamicConfig[data.name] = {
        label: data.name,
        color: data.fill,
      }
    })

    return dynamicConfig
  }, [chartData])

  const totalCost = useMemo(() => {
    return chartData.reduce((sum, data) => sum + data.value, 0)
  }, [chartData])

  const highestPercentageInfo = useMemo(() => {
    if (totalCost === 0 || chartData.length === 0) {
      return null
    }

    let highestPercentage = 0
    let highestPercentageType = 0

    chartData.forEach(data => {
      const percentage = data.value / totalCost
      if (percentage > highestPercentage) {
        highestPercentage = percentage
        highestPercentageType = data.type
      }
    })

    return { type: highestPercentageType, percentage: highestPercentage }
  }, [chartData, totalCost])


  return (
    <Card className="flex flex-col shadow-none">
      <CardHeader className="items-center pb-0">
        <CardTitle className="flex gap-1 text-muted-foreground">
          <FaScrewdriverWrench />
          Custos
        </CardTitle>
        <CardDescription>{cost.totalFormatted}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[300px] pb-0"
          ref={chartRef}
        >
          <PieChart
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload.length) {
                setClickedTooltip(state.activePayload[0].payload as PayloadItem)
              } else {
                setClickedTooltip(null)
              }
            }}
          >
            <ChartTooltip 
              active={!!clickedTooltip}
              payload={clickedTooltip ? [{
                ...clickedTooltip,
                type: "none" as const // recharts expects type to be "none"
              }] : []}
              content={<CustomTooltipContent totalCost={totalCost} />} 
            />
            <Pie 
              data={chartData}
              dataKey="value"
              nameKey="name"
              label
              outerRadius={80}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {highestPercentageInfo && (
          <div className="flex items-center gap-2 leading-6 sm:leading-none font-medium text-muted-foreground">
            <span>
              Gastos em <CostTypeBadge type={highestPercentageInfo.type}/> representam{' '}
              {(highestPercentageInfo.percentage * 100).toFixed(0)}% do total projetado.
            </span>
          </div>
        )}
        <div className="text-muted-foreground leading-none">
          Análise realizada com base em {cost?.items?.length || 0} custos cadastrados para esse veículo.
        </div>
      </CardFooter>
    </Card>
  )
}
