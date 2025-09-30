import { FinanceComparisonFormatted } from "@/commons/models/Finance";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { FaArrowTrendUp, FaGripLines } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

type CardFinanceProps = {
  title: string
  amount: string
  percentage: ReactNode
  description: ReactNode
  last: string
}

export function CardFinance({ title, amount, percentage, description, last }: CardFinanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {amount}
        </CardTitle>
        <CardAction>
          {percentage}
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {description}
        </div>
        <div className="text-muted-foreground">
          {last}
        </div>
      </CardFooter>
    </Card>
  )
}

export function CardFinanceLoading() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <Skeleton className="h-2 w-[100px]" />
        </CardDescription>
        <CardTitle className="tabular-nums">
          <Skeleton className="h-6 w-[200px]" />
        </CardTitle>
        <CardAction>
          <Skeleton className="h-2 w-[20px]" />
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5">
        <div>
          <Skeleton className="h-2 w-[200px]" />
        </div>
        <div className="text-muted-foreground">
          <Skeleton className="h-2 w-[250px]" />
        </div>
      </CardFooter>
    </Card>
  )
}