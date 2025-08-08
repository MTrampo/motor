import { FaArrowTrendUp, FaGripLines } from "react-icons/fa6";
import { Badge } from "../ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function OverviewFinances() {
  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardDescription>Comprados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R$ 68.500,00
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
            2 carros comprados neste mês
            <FaArrowTrendUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Atualizado segunda às 16h
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Manutenções</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R$ 7.250,00
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
            Tendências em alta neste mês
            <FaArrowTrendUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Atualizado à 1h atrás
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Vendidos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R$ 0,00
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
            Tendências em alta
            <FaArrowTrendUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Sem entradas esse mês
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Lucros</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            R$ 0,00
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
            Tendências em alta
            <FaArrowTrendUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Sem entradas esse mês
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}